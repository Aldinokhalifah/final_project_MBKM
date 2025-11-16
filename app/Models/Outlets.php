<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outlets extends Model
{
    protected $table = 'outlets';
    protected $primaryKey = 'outlet_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = ['owner_id', 'name', 'address'];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function transactions() {
        return $this->hasMany(Transactions::class, 'outlet_id');
    }

    public function reports() {
        return $this->hasMany(Reports::class, 'outlet_id');
    }

}
