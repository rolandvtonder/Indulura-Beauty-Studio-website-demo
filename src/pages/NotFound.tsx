import {usePageMeta} from '../hooks/usePageMeta';
import {Lines} from '../components/Lines';
import {Link} from '../components/Link';

export function NotFound() {
  usePageMeta('Page not found · Indulura Beauty Studio', 'This page could not be found.');
  return (
    <section className="grid min-h-svh place-items-center bg-ink px-5 text-center">
      <div>
        <p className="caps text-gold">404</p>
        <h1 className="display mt-6 text-[clamp(52px,8vw,140px)]">
          <Lines lines={[{t: 'Lost your'}, {t: 'way?', i: true}]} />
        </h1>
        <Link to="/" className="caps mt-10 inline-flex min-h-11 items-center bg-pearl px-8 py-4 text-ink hover:bg-blush">
          Back to home
        </Link>
      </div>
    </section>
  );
}
