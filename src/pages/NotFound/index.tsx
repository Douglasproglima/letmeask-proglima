  
import react from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
export default function NotFound() {
  return (
    <div>
      <p>404 - Página não encontrada</p>
      <Link to="/">Voltar para página anterior</Link>
    </div>
  )
}