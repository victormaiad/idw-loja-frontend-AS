/**
 * O componente Alerta fornece uma interface gráfica
 * que mostra título e mensagem.
 * 
 * @param {{titulo:String, mensagem:String}} props 
 * @returns 
 */
export default function Alerta({ titulo, mensagem }) {
  return (
    <div style={{ padding: `${10}px` }}>
      {titulo && (
        <div>
          <strong>{titulo}</strong>
        </div>
      )}
      {mensagem && <div>{mensagem}</div>}
    </div>
  );
}
