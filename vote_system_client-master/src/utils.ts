import moment from "jalali-moment";


export function numLatinToFa(value: string): string {
  if (value) {
    return value.replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
  }
  return '';
}

export function dateGregorianToJalali(value: string): string {
  if (value) {
    return numLatinToFa(moment(value).locale('fa').format('HH:mm YYYY/MM/DD'));
  }
  return '';
}