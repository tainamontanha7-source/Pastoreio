import { ListaDistritos, ListaIgrejas } from '@/components/listas';
import { Tela, Texto } from '@/components/ui';
import { useAuth } from '@/lib/auth';

// Admin vê os distritos da Associação; o pastor vê direto as igrejas do próprio distrito
export default function Igrejas() {
  const { perfil } = useAuth();

  return (
    <Tela>
      {perfil?.papel === 'admin' ? (
        <ListaDistritos />
      ) : perfil?.distrito_id ? (
        <ListaIgrejas distritoId={perfil.distrito_id} />
      ) : (
        <Texto suave>Seu cadastro está aguardando a Associação definir o seu distrito.</Texto>
      )}
    </Tela>
  );
}
