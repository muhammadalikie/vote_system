import {numLatinToFa} from "../../utils.ts";

export default function CustomTooltip({active, payload}: any) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px'}}>
        <p className="label text-gray-600 text-sm">{`${numLatinToFa(payload[0].value.toString())} رای`}</p>
      </div>
    );
  }
  return null;
}