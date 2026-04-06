import { Navigate, useParams } from 'react-router-dom';
import { gramAltinPath } from '@/lib/gramAltinContent';
import { gramSlugFromParams, resolveGramWithDefault } from '@/lib/gramAltinSlug';

/** Eski /N-gram-altin-fiyati adreslerini kanonik /N-gr-altin-kac-tl sayfasına taşır. */
export default function GramAltinLegacyRedirect() {
  const params = useParams();
  const g = resolveGramWithDefault(gramSlugFromParams(params));
  return <Navigate to={gramAltinPath(g)} replace />;
}
