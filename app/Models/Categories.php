<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'category_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = ['owner_id', 'name', 'type'];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function transactions() {
        return $this->hasMany(Transactions::class, 'category_id');
    }

}
