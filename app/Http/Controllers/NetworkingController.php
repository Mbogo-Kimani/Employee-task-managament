namespace App\Http\Controllers;

use App\Models\NetworkingDevice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NetworkingController extends Controller
{
    public function department()
    {
        $networkingDevices = NetworkingDevice::all();
        return view('admin.pages.Departments.Networking.networking', compact('networkingDevices'));
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'device_id' => 'required|string',
            'device_name' => 'required|string',
        ]);

        if ($validate->fails()) {
            notify()->error($validate->getMessageBag());
            return redirect()->back();
        }

        NetworkingDevice::create([
            'device_id' => $request->device_id,
            'device_name' => $request->device_name,
        ]);

        notify()->success('New networking device created successfully.');
        return redirect()->back();
    }

    public function delete($id)
    {
        $device = NetworkingDevice::find($id);
        if ($device) {
            $device->delete();
            notify()->success('Networking device deleted successfully.');
        } else {
            notify()->error('Networking device not found.');
        }
        return redirect()->back();
    }

    public function edit($id)
    {
        $device = NetworkingDevice::find($id);
        return view('admin.pages.Departments.Networking.editDevice', compact('device'));
    }

    public function update(Request $request, $id)
    {
        $device = NetworkingDevice::find($id);
        if ($device) {
            $validate = Validator::make($request->all(), [
                'device_id' => 'required|string',
                'device_name' => 'required|string',
            ]);

            if ($validate->fails()) {
                notify()->error($validate->getMessageBag());
                return redirect()->back();
            }

            $device->update([
                'device_id' => $request->device_id,
                'device_name' => $request->device_name,
            ]);

            notify()->success('Networking device updated successfully.');
            return redirect()->route('Networking.networking');
        } else {
            notify()->error('Networking device not found.');
            return redirect()->back();
        }
    }

    public function searchDepartment(Request $request)
    {
        $searchTerm = $request->search;

        $networkingDevices = NetworkingDevice::where(function ($query) use ($searchTerm) {
            $query->where('device_id', 'LIKE', '%' . $searchTerm . '%')
                ->orWhere('device_name', 'LIKE', '%' . $searchTerm . '%');
        })->paginate(10);

        return view('admin.pages.Departments.Networking.searchDevices', compact('networkingDevices'));
    }
}
