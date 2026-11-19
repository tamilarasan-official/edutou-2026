import { PageHero } from '../components/page/PageParts.jsx';
import { ArrowUpRight } from '../components/layout/icons.jsx';
import { mailto } from '../data/navigation.js';
import usePageTitle from './usePageTitle.js';

/**
 * /verify-certificate. There is no online verification system yet, so this
 * page explains how to verify by email.
 * TODO: replace with an online lookup when a certificate database exists.
 */
export default function VerifyCertificatePage() {
  usePageTitle('Verify Certificate');
  return (
    <>
      <PageHero eyebrow="Verify Certificate" title="Verify an Edutou certificate">
        Employers, institutions and learners can confirm that an Edutou certificate is genuine.
      </PageHero>
      <section className="edt-section">
        <div className="edt-container">
          <div className="edt-card edt-verify">
            <h2>How to verify</h2>
            <ol className="edt-steps">
              <li>
                <strong>Find the certificate ID</strong>
                <span>It is printed on the certificate.</span>
              </li>
              <li>
                <strong>Email it to us</strong>
                <span>Include the certificate ID and the name of the certificate holder.</span>
              </li>
              <li>
                <strong>Get confirmation</strong>
                <span>Our team checks the record and replies to confirm.</span>
              </li>
            </ol>
            <a className="edt-btn edt-btn--primary" href={mailto('Certificate verification request')}>
              Request verification <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
