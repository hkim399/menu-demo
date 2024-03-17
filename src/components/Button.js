const Button = ({ value, onClick, active }) => {
  return (
    <button className={active === value ? 'active' : ''} onClick={() => onClick(value)}>
    {value}
  </button>
  )
}

export default Button