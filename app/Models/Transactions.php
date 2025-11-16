<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    protected $table = 'transactions';
    protected $primaryKey = 'transaction_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'outlet_id', 
        'user_id', 
        'category_id', 
        'type', 
        'amount', 
        'description', 
        'attachment', 
        'date'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function outlet() {
        return $this->belongsTo(Outlets::class, 'outlet_id');
    }

    public function category() {
        return $this->belongsTo(Categories::class, 'category_id');
    }
}
