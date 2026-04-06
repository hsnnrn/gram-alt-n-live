import { Navigate, useParams } from 'react-router-dom';
import { gramAltinPath } from '@/lib/gramAltinContent';
import { resolveGramWithDefault } from '@/lib/gramAltinSlug';

/** Eski /N-gram-altin-fiyati adreslerini kanonik /N-gr-altin-kac-tl sayfasına taşır. */
export default function GramAltinLegacyRedirect() {
  const { gram } = useParams<{ gram: string }>();
  const g = resolveGramWithDefault(gram);
  return <Navigate to={gramAltinPath(g)} replace />;
}
