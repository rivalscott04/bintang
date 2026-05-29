export function formatRupiah(number) {
  return 'Rp ' + Math.round(number).toLocaleString('id-ID');
}
