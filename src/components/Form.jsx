export function Form({ children }) {
  return (
    <div className="p-5 pt-0">
      {children}
    </div>
  )
}

export function FormGroup({ children, name, id }) {
  return (
    <div className="form-group mb-2">
      <label htmlFor={id}>{name}</label>
      {children}
    </div>
  )
}