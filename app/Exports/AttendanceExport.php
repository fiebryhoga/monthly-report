<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithDrawings; 
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing; 

class AttendanceExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize, WithDrawings
{
    protected $reports;
    protected $startDate;
    protected $endDate;
    protected $totals;

    public function __construct($reports, $startDate, $endDate, $totals)
    {
        $this->reports = $reports;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->totals = $totals;
    }

    public function collection()
    {
        return $this->reports;
    }

    
    public function drawings()
    {
        $drawing = new Drawing();
        $drawing->setName('Logo Sawit & Co');
        $drawing->setDescription('Logo Perusahaan');
        $drawing->setPath(public_path('assets/images/sco-logo.png')); 
        $drawing->setHeight(60); 
        $drawing->setCoordinates('A1'); 
        return $drawing;
    }

    public function map($row): array
    {
        return [
            $row->date,
            $row->user_nip,
            $row->user_name,
            $row->department ?? '-',
            strtoupper($row->status),
            $row->time_in,
            $row->time_out,
            $row->late_minutes > 0 ? $row->late_minutes . ' m' : '-',
            $row->note,
        ];
    }

    public function headings(): array
    {
        return [
            ['', 'SAWIT & CO'], 
            ['', 'LAPORAN PRESENSI KARYAWAN'], 
            ['', 'Periode: ' . $this->startDate->format('d-m-Y') . ' s/d ' . $this->endDate->format('d-m-Y')],
            [], 
            ['REKAPITULASI TOTAL:'],
            ['Hadir: ' . $this->totals['present']],
            ['Terlambat: ' . $this->totals['late']],
            ['Sakit: ' . $this->totals['sick']],
            ['Izin: ' . $this->totals['permit']],
            ['Alpha: ' . $this->totals['alpha']],
            [], 

            
            [
                'TANGGAL',
                'NIP',
                'NAMA PEGAWAI',
                'DEPARTEMEN',
                'STATUS',
                'JAM MASUK',
                'JAM PULANG',
                'TERLAMBAT',
                'CATATAN',
            ]
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            'B1' => ['font' => ['bold' => true, 'size' => 16, 'color' => ['argb' => 'FF064D54']]],
            'B2' => ['font' => ['bold' => true, 'size' => 12]],
            5 => ['font' => ['bold' => true, 'underline' => true]], 
            12 => [
                'font' => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
                'fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'startColor' => ['argb' => 'FF064D54']],
                'alignment' => ['horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER],
            ],
        ];
    }
}