import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { BookingRecord } from './booking.service';

@Injectable({ providedIn: 'root' })
export class TicketService {

  download(b: BookingRecord): void {
    const doc  = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [210, 105] });
    const W    = 210;
    const H    = 105;
    const NAVY = '#0a1f44';
    const SKY  = '#0ea5e9';
    const TEAL = '#0891b2';

    //  colour helpers 
    const rgb = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });
    const fill  = (hex: string) => { const c = rgb(hex); doc.setFillColor(c.r, c.g, c.b); };
    const txt   = (hex: string) => { const c = rgb(hex); doc.setTextColor(c.r, c.g, c.b); };
    const draw  = (hex: string) => { const c = rgb(hex); doc.setDrawColor(c.r, c.g, c.b); };
    const bold  = (size: number, color = '#0f172a') => { doc.setFont('helvetica', 'bold');   doc.setFontSize(size); txt(color); };
    const light = (size: number, color = '#64748b') => { doc.setFont('helvetica', 'normal'); doc.setFontSize(size); txt(color); };

    const ref     = 'TW' + b.id.toString().slice(-8).toUpperCase();
    const sym     = b.category === 'international' ? '$' : '\u20B9';
    const fmtAmt  = (n: any) => n ? sym + Number(n).toLocaleString('en-IN') : sym + '0';
    const isIntl  = b.category === 'international';

    // LEFT PANEL  (navy, 0..68)
    fill(NAVY); doc.rect(0, 0, 68, H, 'F');

    // sky-blue left edge accent bar
    fill(SKY); doc.rect(0, 0, 4, H, 'F');

    // diagonal decorative stripe (light navy)
    fill('#0c2d6b');
    doc.triangle(0, 0, 68, 0, 68, 40, 'F');

    // LOGO 
    bold(16, SKY);
    doc.text('TripWave', 12, 16);
    light(7, '#94a3b8');
    doc.text('Your Journey, Our Promise', 12, 22);

    // big destination name, wrapped if long
    bold(13, '#ffffff');
    const destLines = doc.splitTextToSize(b.destination.toUpperCase(), 52);
    doc.text(destLines, 12, 36);

    const destBottom = 36 + destLines.length * 6;

    // category pill
    const catLabel = isIntl ? 'INTERNATIONAL' : 'DOMESTIC';
    fill(SKY);
    doc.roundedRect(12, destBottom + 2, catLabel.length * 1.85 + 6, 7, 1.5, 1.5, 'F');
    bold(6, '#ffffff');
    doc.text(catLabel, 15, destBottom + 7.2);

    const statsY = destBottom + 16;
    light(7, '#94a3b8');
    doc.text('DURATION', 12, statsY);
    doc.text('TRAVELLERS', 40, statsY);
    bold(11, '#ffffff');
    doc.text(`${b.days}N`, 12, statsY + 7);
    doc.text(`${b.people}`, 40, statsY + 7);
    light(7, '#94a3b8');
    doc.text(`${b.days} Night${b.days > 1 ? 's' : ''}`, 12, statsY + 12);
    doc.text(`${b.people} Person${b.people > 1 ? 's' : ''}`, 40, statsY + 12);

    //  ROOM TYPE 
    const roomY = statsY + 20;
    light(7, '#94a3b8');
    doc.text('ROOM TYPE', 12, roomY);
    bold(9, '#ffffff');
    doc.text(b.roomType.toUpperCase(), 12, roomY + 7);

    //  TOTAL PRICE (bottom of left panel) 
    fill(SKY);
    doc.rect(0, H - 18, 68, 18, 'F');
    light(7, '#e0f2fe');
    doc.text('TOTAL PAID', 12, H - 11);
    bold(13, '#ffffff');
    doc.text(fmtAmt(b.total), 12, H - 4);

    fill('#f1f5f9');
    doc.circle(68, 0,   4, 'F');   // top notch
    doc.circle(68, H,   4, 'F');   // bottom notch

    // dashed separator line
    draw('#cbd5e1'); doc.setLineWidth(0.3);
    doc.setLineDashPattern([1.5, 1.5], 0);
    doc.line(68, 6, 68, H - 6);
    doc.setLineDashPattern([], 0);

  
    // RIGHT PANEL  (white, 72..210)
  
    fill('#f8fafc'); doc.rect(68, 0, W - 68, H, 'F');

    // subtle top accent line
    fill(SKY); doc.rect(72, 0, W - 72, 2, 'F');

    const RX = 76;   
    const RW = W - RX - 8; 

    //  BOOKING REFERENCE
    // ref box
    fill('#ffffff');
    draw('#e2e8f0'); doc.setLineWidth(0.4);
    doc.roundedRect(RX, 6, RW, 18, 3, 3, 'FD');

    light(6.5, '#64748b');
    doc.text('BOOKING REFERENCE', RX + 4, 13);
    bold(14, NAVY);
    doc.text(ref, RX + 4, 21);

    // barcode-style stripes (decorative)
    const bcX = W - 36;
    const bcY = 7;
    const bars = [1.2, 0.6, 1.8, 0.6, 1.2, 0.6, 2.4, 0.6, 1.2, 0.6, 1.8, 0.6, 1.2];
    let bx = bcX;
    bars.forEach((bw, i) => {
      fill(i % 2 === 0 ? NAVY : '#ffffff');
      doc.rect(bx, bcY, bw, 14, 'F');
      bx += bw;
    });
    light(5.5, '#94a3b8');
    doc.text(ref, bcX + (bx - bcX) / 2, bcY + 17, { align: 'center' });

    //  INFO GRID (2 columns × 3 rows) 
    const gridY  = 30;
    const cellH  = 16;
    const halfRW = (RW - 6) / 2;

    const cell = (label: string, value: string, cx: number, cy: number, cw = halfRW) => {
      fill('#ffffff');
      draw('#e2e8f0'); doc.setLineWidth(0.3);
      doc.roundedRect(cx, cy, cw, cellH, 2, 2, 'FD');
      light(6, '#94a3b8');
      doc.text(label.toUpperCase(), cx + 3, cy + 5.5);
      bold(8.5, '#0f172a');
      // truncate long values
      const maxW = cw - 6;
      const val  = doc.splitTextToSize(value, maxW)[0] ?? value;
      doc.text(val, cx + 3, cy + 12.5);
    };

    const col1x = RX;
    const col2x = RX + halfRW + 6;

    cell('Traveller Name', b.name,  col1x, gridY);
    cell('Travel Date',    b.date,  col2x, gridY);

    cell('Email',  b.email,          col1x, gridY + cellH + 3);
    cell('Phone',  b.phone || '—',   col2x, gridY + cellH + 3);

    cell('Base Price',    fmtAmt((b as any).basePrice),    col1x, gridY + (cellH + 3) * 2);
    cell('Room Surcharge', fmtAmt((b as any).roomSurcharge), col2x, gridY + (cellH + 3) * 2);

    //  PRICE STRIP 
    const priceY = gridY + (cellH + 3) * 3 + 2;

    fill('#ffffff');
    draw('#e2e8f0'); doc.setLineWidth(0.3);
    doc.roundedRect(RX, priceY, RW, 10, 2, 2, 'FD');

    light(6.5, '#64748b');
    doc.text(`Subtotal: ${fmtAmt((b as any).subtotal)}`, RX + 3, priceY + 6.5);

    const taxStr = `Tax (5%): ${fmtAmt((b as any).taxes)}`;
    doc.text(taxStr, RX + RW / 2 + 2, priceY + 6.5);

    // ── FOOTER  
    fill(NAVY);
    doc.rect(68, H - 12, W - 68, 12, 'F');

    light(6.5, '#94a3b8');
    const genDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.text(`Generated: ${genDate}`, RX, H - 4.5);

    bold(6.5, SKY);
    doc.text('Thank you for choosing TripWave! Safe travels.', W - 8, H - 4.5, { align: 'right' });

    // SAVE  
    doc.save(`TripWave-${ref}.pdf`);
  }
}
