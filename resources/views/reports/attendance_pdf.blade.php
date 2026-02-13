<!DOCTYPE html>
<html>
<head>
    <title>Laporan Presensi</title>
    <style>
        body { font-family: sans-serif; font-size: 9pt; color: #333; }
        
        
        .kop-container {
            width: 100%;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 4px double #064d54; 
        }
        .kop-table { width: 100%; border-collapse: collapse; }
        .kop-table td { border: none; padding: 0; vertical-align: middle; }
        
        .logo-cell { width: 100px; text-align: center; }
        .logo-img { width: 80px; height: auto; }

        .text-cell { text-align: center; padding-left: 10px; padding-right: 10px; }
        .company-name { 
            font-size: 20pt; 
            font-weight: bold; 
            color: #064d54; 
            text-transform: uppercase; 
            margin: 0; 
            letter-spacing: 2px;
        }
        .company-address { font-size: 9pt; color: #555; margin-top: 5px; line-height: 1.3; }
        .report-title { 
            text-align: center; 
            margin: 20px 0; 
            font-size: 14pt; 
            font-weight: bold; 
            text-decoration: underline; 
            text-transform: uppercase;
        }
        
        
        .summary { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
        .summary td { padding: 8px; background: #f0fdf4; border: 1px solid #064d54; text-align: center; font-weight: bold; }
        .summary-label { color: #555; font-size: 8pt; text-transform: uppercase; display: block; margin-bottom: 3px; }
        .summary-val { font-size: 14pt; color: #064d54; }

        
        table.data { width: 100%; border-collapse: collapse; margin-top: 10px; }
        table.data th, table.data td { border: 1px solid #ccc; padding: 8px; text-align: left; vertical-align: middle; }
        table.data th { background-color: #064d54; color: white; text-transform: uppercase; font-size: 8pt; font-weight: bold; }
        table.data tr:nth-child(even) { background-color: #f9fafb; }
        
        
        .badge { 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 7pt; 
            font-weight: bold; 
            color: white; 
            display: inline-block;
            min-width: 50px;
            text-align: center;
        }
        .bg-present { background-color: #10b981; } 
        .bg-late { background-color: #f59e0b; }    
        .bg-sick { background-color: #ec4899; }    
        .bg-permit { background-color: #3b82f6; }  
        .bg-alpha { background-color: #ef4444; }   

        .footer { margin-top: 40px; text-align: right; font-size: 8pt; color: #999; border-top: 1px solid #eee; padding-top: 5px; font-style: italic; }
        .periode-info { text-align: center; font-size: 10pt; margin-bottom: 15px; }
    </style>
</head>
<body>

    <div class="kop-container">
        <table class="kop-table">
            <tr>
                <td class="logo-cell">
                    <img src="{{ public_path('assets/images/sco-logo.png') }}" class="logo-img" alt="Logo">
                </td>
                
                <td class="text-cell">
                    <h1 class="company-name">Sawit & Co. Enterprise</h1>
                    <div class="company-address">
                        Gedung Menara Sawit Lt. 12, Jl. Jendral Sudirman Kav. 58, Jakarta Selatan<br>
                        Telp: (021) 555-0199 | Email: hr@sawit-co.com | Web: www.sawit-co.com
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="report-title">Laporan Presensi Karyawan</div>
    
    <div class="periode-info">
        <strong>Pegawai:</strong> {{ $filter_name }} &nbsp;|&nbsp; 
        <strong>Periode:</strong> {{ $start_date }} s/d {{ $end_date }}
    </div>

    <table class="summary">
        <tr>
            <td><span class="summary-label">Hadir</span><span class="summary-val">{{ $totals['present'] }}</span></td>
            <td><span class="summary-label">Terlambat</span><span class="summary-val" style="color: #d97706">{{ $totals['late'] }}</span></td>
            <td><span class="summary-label">Sakit</span><span class="summary-val" style="color: #ec4899">{{ $totals['sick'] }}</span></td>
            <td><span class="summary-label">Izin</span><span class="summary-val" style="color: #3b82f6">{{ $totals['permit'] }}</span></td>
            <td><span class="summary-label">Alpha</span><span class="summary-val" style="color: #ef4444">{{ $totals['alpha'] }}</span></td>
        </tr>
    </table>

    <table class="data">
        <thead>
            <tr>
                <th style="width: 80px; text-align: center;">Tanggal</th>
                <th>Nama Pegawai</th>
                <th style="width: 80px;">NIP</th>
                <th style="width: 70px; text-align: center;">Status</th>
                <th style="text-align: center; width: 60px;">Masuk</th>
                <th style="text-align: center; width: 60px;">Pulang</th>
                <th style="text-align: center; width: 60px;">Telat</th>
                <th>Catatan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reports as $row)
            <tr>
                <td style="text-align: center;">{{ \Carbon\Carbon::parse($row->date)->format('d/m/Y') }}</td>
                <td>
                    <strong>{{ $row->user_name }}</strong><br>
                    <span style="font-size: 8pt; color: #777;">{{ $row->department ?? 'General' }}</span>
                </td>
                <td>{{ $row->user_nip ?? '-' }}</td>
                <td style="text-align: center;">
                    @php
                        $color = 'bg-present';
                        if($row->status == 'late') $color = 'bg-late';
                        if($row->status == 'sick') $color = 'bg-sick';
                        if($row->status == 'permit') $color = 'bg-permit';
                        if($row->status == 'alpha') $color = 'bg-alpha';
                    @endphp
                    <span class="badge {{ $color }}">{{ strtoupper($row->status) }}</span>
                </td>
                <td style="text-align: center;">{{ $row->time_in }}</td>
                <td style="text-align: center;">{{ $row->time_out }}</td>
                <td style="text-align: center; font-weight: bold; color: {{ $row->late_minutes > 0 ? '#d97706' : '#ccc' }}">
                    {{ $row->late_minutes > 0 ? $row->late_minutes.'m' : '-' }}
                </td>
                <td style="font-size: 8pt;">{{ $row->note }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Dicetak otomatis oleh Sistem HRIS Sawit & Co. | Tanggal Cetak: {{ date('d F Y H:i') }} WIB</p>
    </div>

</body>
</html>