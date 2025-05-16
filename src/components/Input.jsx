export default function Input({ label, id, type }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={id} required/>
    </p>
  );
}
