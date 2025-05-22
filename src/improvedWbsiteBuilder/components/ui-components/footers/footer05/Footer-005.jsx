import React from 'react';
import footerConfig from './FooterConfig';

const Footer005 = () => {
  const {
    companyName,
    description,
    logo,
    socialLinks,
    links,
    bottomLinks,
    styles,
  } = footerConfig;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo and Description */}
          <div className={styles.column}>
            <div className={styles.logoContainer}>
              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  className={styles.logo}
                />
              )}
              <span className={styles.companyName}>{companyName}</span>
            </div>
            <p className={styles.description}>{description}</p>
            <div className={styles.socialContainer}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <span className="sr-only">{social.name}</span>
                  <i className={`fab fa-${social.icon} ${styles.socialIcon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links Sections */}
          {links.map((section, index) => (
            <div key={index} className={styles.column}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.sectionList}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a href={item.url} className={styles.link}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            {bottomLinks.map((link, index) => (
              <a key={index} href={link.url} className={styles.bottomLink}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer005;
