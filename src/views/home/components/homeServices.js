import React from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/homeServices.css"

const HomeServices = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="home-s-container">
        <div className="container">
          <h2 className="h2-style">{t`home-services.title`}</h2>
          <p className="p-style">{t`home-services.description`}</p>
          <div className="services-con">
            <div className="service">
              <div className="service-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <g clip-path="url(#clip0_265_869)">
                    <path
                      d="M13.8333 15H27.1666"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.8333 21.6667H23.8333"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.5 30H10.5C9.17392 30 7.90215 29.4732 6.96447 28.5355C6.02678 27.5979 5.5 26.3261 5.5 25V11.6667C5.5 10.3406 6.02678 9.06882 6.96447 8.13114C7.90215 7.19346 9.17392 6.66667 10.5 6.66667H30.5C31.8261 6.66667 33.0979 7.19346 34.0355 8.13114C34.9732 9.06882 35.5 10.3406 35.5 11.6667V25C35.5 26.3261 34.9732 27.5979 34.0355 28.5355C33.0979 29.4732 31.8261 30 30.5 30H25.5L20.5 35L15.5 30Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_265_869">
                      <rect
                        width="40"
                        height="40"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <h3 className="h4-style">{t`home-services.service-consulting-title`}</h3>
              </div>
              <p className="p-style">{t`home-services.service-consulting-description`}</p>
            </div>
            <div className="service">
              <div className="service-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <g clip-path="url(#clip0_265_360)">
                    <path
                      d="M35.5 20C35.5 17.0333 34.6203 14.1332 32.9721 11.6665C31.3238 9.19972 28.9812 7.27713 26.2403 6.14181C23.4994 5.0065 20.4834 4.70945 17.5737 5.28823C14.6639 5.86701 11.9912 7.29562 9.8934 9.3934C7.79562 11.4912 6.36701 14.1639 5.78823 17.0737C5.20945 19.9834 5.5065 22.9994 6.64181 25.7403C7.77713 28.4812 9.69972 30.8238 12.1665 32.4721C14.6332 34.1203 17.5333 35 20.5 35"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.5 15H34.5"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.5 25H19.6667"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.6667 5C16.8589 9.49935 15.3704 14.6964 15.3704 20C15.3704 25.3036 16.8589 30.5006 19.6667 35"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.3334 5C24.0287 9.31623 25.5107 14.2792 25.6234 19.3667"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.5 30C25.5 31.3261 26.0268 32.5979 26.9645 33.5355C27.9021 34.4732 29.1739 35 30.5 35C31.8261 35 33.0979 34.4732 34.0355 33.5355C34.9732 32.5979 35.5 31.3261 35.5 30C35.5 28.6739 34.9732 27.4021 34.0355 26.4645C33.0979 25.5268 31.8261 25 30.5 25C29.1739 25 27.9021 25.5268 26.9645 26.4645C26.0268 27.4021 25.5 28.6739 25.5 30Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M34.1666 33.6667L37.1666 36.6667"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_265_360">
                      <rect
                        width="40"
                        height="40"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <h3 className="h4-style">{t`home-services.service-search-title`}</h3>
              </div>
              <p className="p-style">{t`home-services.service-search-description`}</p>
            </div>
            <div className="service">
              <div className="service-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <g clip-path="url(#clip0_265_2349)">
                    <path
                      d="M8.83337 28.3333C8.83337 29.2174 9.18456 30.0652 9.80968 30.6904C10.4348 31.3155 11.2827 31.6667 12.1667 31.6667C13.0508 31.6667 13.8986 31.3155 14.5237 30.6904C15.1489 30.0652 15.5 29.2174 15.5 28.3333C15.5 27.4493 15.1489 26.6014 14.5237 25.9763C13.8986 25.3512 13.0508 25 12.1667 25C11.2827 25 10.4348 25.3512 9.80968 25.9763C9.18456 26.6014 8.83337 27.4493 8.83337 28.3333Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.5 28.3333C25.5 29.2174 25.8512 30.0652 26.4763 30.6904C27.1014 31.3155 27.9493 31.6667 28.8333 31.6667C29.7174 31.6667 30.5652 31.3155 31.1904 30.6904C31.8155 30.0652 32.1667 29.2174 32.1667 28.3333C32.1667 27.4493 31.8155 26.6014 31.1904 25.9763C30.5652 25.3512 29.7174 25 28.8333 25C27.9493 25 27.1014 25.3512 26.4763 25.9763C25.8512 26.6014 25.5 27.4493 25.5 28.3333Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.83337 28.3333H5.50004V21.6667M3.83337 8.33333H22.1667V28.3333M15.5 28.3333H25.5M32.1667 28.3333H35.5V18.3333M35.5 18.3333H22.1667M35.5 18.3333L30.5 9.99999H22.1667"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 15H12.1667"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_265_2349">
                      <rect
                        width="40"
                        height="40"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <h3 className="h4-style">{t`home-services.service-analysis-title`}</h3>
              </div>
              <p className="p-style">{t`home-services.service-analysis-description`}</p>
            </div>
          </div>
          <Link
            to="/services"
            className="register-btn services-button"
          >{t`home-services.more`}</Link>
        </div>
      </div>
    </>
  )
}

export default HomeServices
