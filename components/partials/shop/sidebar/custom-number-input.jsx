import {debounceTime, Subject} from "rxjs";

export default function CustomNumberInput({ value, postfix, onChange }) {
  const onInput = new Subject();

  onInput.pipe(debounceTime(400)).subscribe((res) => {
    onChange(res);
  })

  function onInputChange(e) {
    onInput.next(e.target.value);
  }

  return (
    <div datapostfix={postfix} className="widget-input-number">
      <input onChange={onInputChange} value={value} className="form-control" type="number" />
    </div>
  )
}