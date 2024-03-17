import Button from './Button'

const FilterButtonGroup = ({ values, onClick, active, label, isHorizontal }) => {
  return (
<div className="filter-group">
    <p>{label}</p>
    <div className={isHorizontal ? 'button-container horizontal' : 'button-container vertical'}>
      {values.map(value => (
        <Button key={value} value={value} onClick={onClick} active={active} />
      ))}
    </div>
  </div>  )
}

export default FilterButtonGroup