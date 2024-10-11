// just a form wrapper to reuse
export function Form({ children }) {
  return (
    <div className="p-5 pt-0" style={{ minWidth: "450px" }}>
      {children}
    </div>
  )
}

// this reusable form group having a wrapper and a label. it will need an input field as children
export function FormGroup({ children, name, id }) {
  return (
    <div className="form-group mb-2">
      <label htmlFor={id}>{name}</label>
      {children}
    </div>
  )
}