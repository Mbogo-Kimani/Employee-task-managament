<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\StreetPackage;
use App\Models\StreetPlan;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PaymentController extends Controller
{
    public function get_token()
    {
        $url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

        $token_object = Http::withBasicAuth(config("mpesa.consumer_key"), config("mpesa.consumer_secret"))->get($url);
                                                         
        return $token_object['access_token'];
    }

    public function b2cRequest(Request $request)
    {
        $curl_post_data = array(
            'InitiatorName' => env('MPESA_B2C_INITIATOR'),
            'SecurityCredential' => env('MPESA_B2C_PASSOWRD'),
            'CommandID' => 'SalaryPayment',
            'Amount' => $request->amount,
            'PartyA' => env('MPESA_SHORTCODE'),
            'PartyB' => $request->phone,
            'Remarks' => $request->remarks,
            'QueueTimeOutURL' => env('MPESA_TEST_URL') . '/mpesaLaravel/api/b2ctimeout',
            'ResultURL' => env('MPESA_TEST_URL') . '/mpesaLaravel/api/b2ccallback',
            'Occasion' => $request->occasion
          );

        $res = $this->makeHttp('/b2c/v1/paymentrequest', $curl_post_data);

        return $res;
    }


    /**
     * Register URL
     */
    public function registerURLS()
    {
        $body = array(
            'ShortCode' => env('MPESA_SHORTCODE'),
            'ResponseType' => 'Completed',
            'ConfirmationURL' => env('MPESA_TEST_URL') . '/api/confirmation',
            'ValidationURL' => env('MPESA_TEST_URL') . '/api/validation'
        );

        $url = '/c2b/v1/registerurl';
        $response = $this->makeHttp($url, $body);

        return $response;
    }

    public function stkPush(Request $request)
    {
        $request->validate([
            "amount" => 'required',
            "package_id" => 'required',
            "client_id" => 'required',
            "country_code" => "required|integer",
            "phone_number" => "required|integer",
            "product" => 'required',
        ]);
       
        if ($request->country_code && $request->phone_number) {
            $phone_number = intval($request->country_code.$request->phone_number);
        }

        $client = Client::find($request->client_id);
        if(!$client){
            throw new NotFoundHttpException('User not found');
        }
        
        /* Mpesa functionality */

        $access_token = $this->get_token();
        $url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        $pass_key = config("mpesa.passkey");
        $business_short_code = config("mpesa.shortcode");
        $timestamp = Carbon::now()->format('YmdHis');
        $password = base64_encode($business_short_code.$pass_key.$timestamp);
        $transaction_type = 'CustomerPayBillOnline';
        $callback_url = config('app.url').'/api/payment-callback'; // has to be a https kind
        $account_reference = 'Elephant Technologies';
        $transaction_desc = 'Test';
        
        if ($request->brief_description) {
            $transaction_desc = $request->brief_description;
        }

        $res = Http::withOptions(['verify' => false])->withToken($access_token)->post($url, [
            'BusinessShortCode' => $business_short_code,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => $transaction_type,
            'Amount' => $request->amount,
            // 'Amount' => 1,
            'PartyA' => $phone_number,
            'PartyB' => $business_short_code,
            'PhoneNumber' => $phone_number,
            'CallBackURL' => $callback_url,
            'AccountReference' => $account_reference,
            'TransactionDesc' => $transaction_desc
        ]);

        if ($res->ok()) {
// <<<<<<< fix_payment_remaining_features
// 						$street_package = StreetPackage::find($request->product);
//             $pending_plan = StreetPlan::create([
//                 'street_package_id' => $request->product,
//                 'client_id' => $request->clientId,
// 								'validity' => $street_package->duration,
// 								'validity_unit' => $street_package->duration_unit,
//             ]);
    

            $client->mpesa_number = $phone_number;
            $client->street_package_id = $request->package_id;
            $client->save();

            return response()->json($res);
        } else {
            abort(400, 'Payment did not go through');
        }
    }

    public function paymentCallback(Request $request){
        $items = [];
        $amount = 0;
        $phone_number = 0;
        $transaction_date = '';
        $confirmation_code = '';
       
        $data = request()->json()->all();
        

        // Log::info('Payment Callback Request:', [request()->cookie('client_details')]);

        if(isset($data['Body']['stkCallback']['CallbackMetadata']['Item'])){
            $items =  $data['Body']['stkCallback']['CallbackMetadata']['Item'];
            foreach ($items as $item) {
                if ($item['Name'] == 'Amount') {
                    $amount = $item['Value'];
                } else if ($item['Name'] == 'MpesaReceiptNumber'){
                    $confirmation_code = $item['Value'];
                } else if ($item['Name'] == 'PhoneNumber'){
                    $phone_number = $item['Value'];
                } else if ($item['Name'] == 'TransactionDate'){
                    $transaction_date = Carbon::createFromFormat('YmdHis', $item['Value'])->format('Y-m-d');
                }
            }
        }
        $client = Client::where('mpesa_number', 'LIKE', "%$phone_number%")->orderBy('mpesa_number', 'desc')->first();
        if(!empty($confirmation_code)){
//           $transaction = Transaction::create([
//             'client_id' => $client->id ?? null,
//             'amount' => $amount,
//             'paid_date' => $transaction_date,
//             'payment_confirmation' => $confirmation_code,
//             'phone_number' => $phone_number
//           ]);
          
// 					$unpaid_plans = StreetPlan::where('client_id', $client->id)
// 																		->whereNull('transaction_id')
// 																		->get();

// 					for ($i = 0; $i < count($unpaid_plans); $i++) {
// 						$plan = $unpaid_plans[$i];
// 						$street_package = $plan->streetPackage()->first();

// 						if ($street_package->cost == $transaction->amount) {
// 							$plan->transaction_id = $transaction->id;
// 							$transaction->taken = true;
// 							$plan->save();
// 							$transaction->save();
// 						}
// 					}

            $transaction = Transaction::create([
                'client_id' => $client->id ?? null,
                'amount' => $amount,
                'paid_date' => $transaction_date,
                'payment_confirmation' => $confirmation_code,
                'phone_number' => $phone_number
            ]);
            // Log::info('Transaction:', $transaction);
		    return Inertia::render('Client/Checkout',compact('transaction'));

        }
        // return response()->json(['success' => 'Transaction successful','data' => [$amount,$phone_number,$transaction_date,$confirmation_code]]);
		return redirect('/products')->with(['success' => false]);
    }

    /**
     * Simulate Transaction
     */
    public function simulateTransaction(Request $request)
    {
        $body = array(
            'ShortCode' => env('MPESA_SHORTCODE'),
            'Msisdn' => '254708374149',
            'Amount' => $request->amount,
            'BillRefNumber' => $request->account,
            'CommandID' => 'CustomerPayBillOnline'
        );

        $url =  '/c2b/v1/simulate';
        $response = $this->makeHttp($url, $body);

        return $response;
    }

    /**
     * Transaction status API
     */
    public function transactionStatus(Request $request)
    {
        $body =  array(
            'Initiator' => env('MPESA_B2C_INITIATOR'),
            'SecurityCredential' => env('MPESA_B2C_PASSWORD'),
            'CommandID' => 'TransactionStatusQuery',
            'TransactionID' => $request->transactionid,
            'PartyA' => env('MPESA_SHORTCODE'),
            'IdentifierType' => '4',
            'ResultURL' => env('MPESA_TEST_URL'). '/api/transaction-status/result_url',
            'QueueTimeOutURL' => env('MPESA_TEST_URL'). '/api/transaction-status/timeout_url',
            'Remarks' => 'CheckTransaction',
            'Occasion' => 'VerifyTransaction'
          );

        $url =  'transactionstatus/v1/query';
        $response = $this->makeHttp($url, $body);

        return $response;
    }


    public function reverseTransaction(Request $request){
        $body = array(
            'Initiator' => env('MPESA_B2C_INITIATOR'),
            'SecurityCredential' => env('MPESA_B2C_PASSWORD'),
            'CommandID' => 'TransactionReversal',
            'TransactionID' => $request->transactionid,
            'Amount' => $request->amount,
            'ReceiverParty' => env('MPESA_SHORTCODE'),
            'RecieverIdentifierType' => '11',
            'ResultURL' => env('MPESA_TEST_URL') . '/api/reversal/result_url',
            'QueueTimeOutURL' => env('MPESA_TEST_URL') . '/api/reversal/timeout_url',
            'Remarks' => 'ReversalRequest',
            'Occasion' => 'ErroneousPayment'
          );

          $url =  'reversal/v1/request';
          $response = $this->makeHttp($url, $body);
  
          return $response;
    }


    public function makeHttp($url, $body)
    {
        // $url = 'https://mpesa-reflector.herokuapp.com' . $url;
        $url = 'https://sandbox.safaricom.co.ke/mpesa/' . $url;
        $curl = curl_init();
        curl_setopt_array(
            $curl,
            array(
                    CURLOPT_URL => $url,
                    CURLOPT_HTTPHEADER => array('Content-Type:application/json','Authorization:Bearer '. $this->getAccessToken()),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_POST => true,
                    CURLOPT_POSTFIELDS => json_encode($body)
                )
        );
        $curl_response = curl_exec($curl);
        curl_close($curl);
        return $curl_response;
    }
}


