<?php

namespace App\Exports;

use App\Models\TaskReport;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings; 

class ReportsExports implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    use Exportable;
    public function headings() : array
    {
        return [
            'id',
            'task_id',
            'title'
        ];
    } 
    public function collection()
    {
        
        return TaskReport::find(3);
    }
}
