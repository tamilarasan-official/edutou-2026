import FaqItem from '../FaqItem.jsx';
import { faqs } from '../../data/faq.js';

export default function FaqSection() {
  return (
    <section className="framer-1rbr5xo" data-framer-name="FAQ" id="faq">
      <div className="framer-3xiqmp" data-framer-name="Container">
        <div className="ssr-variant hidden-5qv5n">
          <div
            className="framer-11gl5ow"
            data-framer-name="Heading"
            style={{ willChange: 'transform', opacity: '0', transform: 'translateY(50px)' }}
          >
            <div className="framer-yufxp6" data-framer-name="FAQ" style={{ transform: 'none' }}>
              <h2
                className="framer-text framer-styles-preset-163xgy6"
                data-styles-preset="EEpMe6lZZ"
                style={{ '--framer-text-alignment': 'center' }}
              >
                {'FAQ'}
              </h2>
            </div>
          </div>
        </div>
        <div className="ssr-variant hidden-19c3vgf hidden-72rtr7">
          <div
            className="framer-11gl5ow"
            data-framer-name="Heading"
            style={{ willChange: 'transform', opacity: '0', transform: 'translateY(80px)' }}
          >
            <div className="framer-yufxp6" data-framer-name="FAQ" style={{ transform: 'none' }}>
              <h2
                className="framer-text framer-styles-preset-163xgy6"
                data-styles-preset="EEpMe6lZZ"
                style={{ '--framer-text-alignment': 'center' }}
              >
                {'FAQ'}
              </h2>
            </div>
          </div>
        </div>
        <div className="framer-1c1yyb7" data-framer-name="List">
          {faqs.map((faq) => (
            <FaqItem key={faq.container} {...faq} />
          ))}
        </div>
      </div>
      <div className="framer-1a5qlxf" data-framer-name="Grid">
        <div className="ssr-variant hidden-19c3vgf hidden-5qv5n">
          <div className="framer-kl5dm0-container">
            <div
              className="framer-vPHsY framer-106y44h framer-v-1y0us3z"
              data-framer-name="Desktop-line"
              style={{ height: '100%', width: '100%' }}
            >
              <div className="framer-n8oenb" data-framer-name="Grid" style={{ opacity: '0.6' }}>
                <div
                  className="framer-ci7ixb"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
                <div
                  className="framer-1yseh9u"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
                <div
                  className="framer-ny48h9"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ssr-variant hidden-72rtr7 hidden-5qv5n">
          <div className="framer-kl5dm0-container">
            <div
              className="framer-vPHsY framer-106y44h framer-v-eqkplt"
              data-framer-name="Tablet-line"
              style={{ height: '100%', width: '100%' }}
            >
              <div className="framer-n8oenb" data-framer-name="Grid" style={{ opacity: '0.6' }}>
                <div
                  className="framer-ci7ixb"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
                <div
                  className="framer-1yseh9u"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
                <div
                  className="framer-ny48h9"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ssr-variant hidden-19c3vgf hidden-72rtr7">
          <div className="framer-kl5dm0-container">
            <div
              className="framer-vPHsY framer-106y44h framer-v-1gc392w"
              data-framer-name="Phone-Line"
              style={{ height: '100%', width: '100%' }}
            >
              <div className="framer-n8oenb" data-framer-name="Grid" style={{ opacity: '0.6' }}>
                <div
                  className="framer-ci7ixb"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
                <div
                  className="framer-1yseh9u"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
                <div
                  className="framer-ny48h9"
                  data-framer-name="Line"
                  style={{
                    backgroundColor: 'var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))',
                    opacity: '0.2',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
