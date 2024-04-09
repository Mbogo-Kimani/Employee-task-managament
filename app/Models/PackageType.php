<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageType extends Model
{
    use HasFactory;

    public function packageBundles(){
        return $this->hasMany(Package::class, 'type', 'id');
    }

    public $fillables = ['name'];
}
