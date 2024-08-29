<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TransactionEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $transactionId;
    public $confirmation_code;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($transactionId, $confirmation_code)
    {
        $this->transactionId = $transactionId;
        $this->confirmation_code = $confirmation_code;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('private.transaction');
    }
    public function broadcastAs()
	{
		return 'transaction';
	}
 
	public function broadcastWith()
	{
		return [
			'transaction' => $this->transactionId,
            'confirmations' => $this->confirmation_code,
		];
	}
}
