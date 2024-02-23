export default function Error ({ title, message }) {
  return (
    <div className="error">
      <p className="error-title">{title}</p>
      <p>{message}</p>
    </div>
  );
}
