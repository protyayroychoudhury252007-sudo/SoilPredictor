function RangeField({label,name,value,min,max,step = 1,unit = "",onChange,}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <>
      <style>{`
        .range-field {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .range-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .range-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #5b4a3b;
        }
        .range-value {
          background: #eee4d6;
          color: #4b392b;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .range-slider {
          width: 100%;
          height: 8px;
          appearance: none;
          -webkit-appearance: none;
          border-radius: 20px;
          background: linear-gradient(to right,#758d63 0%,#758d63 var(--progress),#ded5c8 var(--progress),#ded5c8 100%);
          cursor: pointer;
          outline: none;
        }
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4b392b;
          cursor: grab;
          border: 3px solid #f7f2ea;
          box-shadow: 0 4px 12px rgba(0,0,0,.2);
        }
        .range-slider::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
        }
        .range-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4b392b;
          cursor: pointer;
          border: 3px solid #f7f2ea;
        }
        .range-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #8a7968;
        }
      `}</style>
      <div className="range-field">
        <div className="range-header">
          <label className="range-label">{label}</label>
          <span className="range-value">{value} {unit}</span>
        </div>
        <input type="range" name={name} min={min} max={max} step={step} value={value} onChange={onChange} className="range-slider" style={{ "--progress": `${percentage}%`,}}/>
        <div className="range-limits">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </>
  );
}

export default RangeField;