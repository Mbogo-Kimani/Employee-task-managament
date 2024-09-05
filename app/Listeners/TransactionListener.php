<?php

namespace App\Listeners;

use App\Events\transaction;
use App\Events\TransactionEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class TransactionListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\transaction  $event
     * @return void
     */
    public function handle(TransactionEvent $event)
    {
        Log::info('TaskMessageChatListener received the event:', ['message' => $event]);
    }
}
