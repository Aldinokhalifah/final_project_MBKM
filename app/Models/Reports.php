<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{
    protected $table = 'reports';
    protected $primaryKey = 'report_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'owner_id',
        'outlet_id',
        'period',
        'start_date',
        'end_date',
        'total_income',
        'total_expense',
    ];

    protected $casts = [
        'total_income' => 'decimal:2',
        'total_expense' => 'decimal:2',
        'generated_at' => 'datetime',
        'start_date' => 'date',
        'end_date' => 'date'
    ];

    public function outlet() {
        return $this->belongsTo(Outlets::class, 'outlet_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
