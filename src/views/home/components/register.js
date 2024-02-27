import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/register.css"

const Register = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="r-container r-background-attachment ">
        <div className="container">
          <div className="inside-container">
            <svg
              width="373"
              height="212"
              viewBox="0 0 373 212"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.0077 29.7637H26.3542L18.5592 3.42609H18.4411L10.6461 29.7637H8.99265L0.961426 0.591553H2.61494L9.81937 27.2835H9.93748L17.6144 0.591553H19.2678L26.9447 27.2835H27.0628L34.2673 0.591553H35.8027L28.0077 29.7637Z"
                fill="white"
              />
              <path
                d="M55.6447 26.6925C55.1723 27.5192 54.5818 28.1098 53.8731 28.5822C53.1645 29.0546 52.4559 29.4089 51.6291 29.6451C50.8024 29.8813 50.0938 29.9995 49.267 30.1176C48.4403 30.2357 47.6135 30.2357 46.9049 30.2357C44.3066 30.2357 42.1806 29.527 40.5272 28.1098C38.8737 26.6925 38.165 24.8028 38.165 22.2045C38.165 21.0234 38.2832 19.9605 38.6375 18.8975C38.9918 17.8346 39.4642 16.8897 40.1729 16.063C40.8815 15.2362 41.8263 14.6457 42.8893 14.1733C43.9522 13.7008 45.3695 13.4646 46.9049 13.4646H55.7628V8.50418C55.7628 6.37827 55.1723 4.72479 54.1093 3.42562C52.9283 2.24456 51.1567 1.53594 48.6765 1.53594C46.9049 1.53594 45.3695 1.77215 44.0703 2.36268C42.7712 2.95321 41.7082 3.66184 40.8815 4.72479L39.7004 3.77994C40.7634 2.59888 41.9445 1.77214 43.2436 1.0635C44.5428 0.472974 46.3144 0.118652 48.6765 0.118652C49.9757 0.118652 51.1567 0.236762 52.2197 0.472974C53.2826 0.709186 54.2275 1.18162 55.0542 1.77215C55.8809 2.36268 56.4715 3.30752 56.9439 4.37047C57.4163 5.43343 57.6525 6.73258 57.6525 8.38607V29.6451H56.1172V26.5744H55.6447V26.6925ZM47.1411 14.8819C45.0152 14.8819 43.1255 15.4724 41.7082 16.6535C40.2909 17.8345 39.4642 19.6061 39.4642 22.2045C39.4642 24.2123 40.0547 25.8658 41.3539 27.1649C42.6531 28.4641 44.5428 29.0546 47.023 29.0546C47.9678 29.0546 48.9127 28.9365 49.9756 28.7003C51.0386 28.4641 51.8653 28.1098 52.6921 27.6373C53.5188 27.1649 54.2274 26.4563 54.6999 25.6295C55.1723 24.8028 55.5266 23.858 55.5266 22.6769V15H47.1411V14.8819Z"
                fill="white"
              />
              <path
                d="M74.896 1.77225C74.4236 1.65414 74.0693 1.65413 73.7149 1.65413C71.2347 1.65413 69.2269 2.48087 67.8096 4.25246C66.2743 6.02405 65.5656 8.38618 65.5656 11.2207V29.7634H64.0303V0.591189H65.5656V5.66975H65.8019C66.6286 3.66195 67.6915 2.24468 69.1088 1.53604C70.5261 0.709298 72.0615 0.35498 73.7149 0.35498C74.1874 0.35498 74.7779 0.35498 75.2503 0.35498C75.7228 0.35498 76.1952 0.473083 76.6676 0.591189L76.3133 2.12657C75.7228 1.89036 75.2503 1.77225 74.896 1.77225Z"
                fill="white"
              />
              <path
                d="M97.1004 22.3223C97.1004 23.3852 96.8641 24.4482 96.5098 25.393C96.1555 26.3379 95.565 27.1646 94.7382 27.8732C93.9115 28.5819 92.9666 29.1724 91.6675 29.5267C90.4864 29.9991 88.951 30.1173 87.2975 30.1173C85.0535 30.1173 83.0457 29.7629 81.5104 28.9362C79.975 28.2276 78.6758 26.9284 77.731 25.1568L79.1482 24.3301C79.8569 25.8654 81.0379 26.9284 82.4552 27.637C83.8725 28.3457 85.6441 28.7 87.6519 28.7C88.7148 28.7 89.6597 28.5819 90.6045 28.3457C91.5494 28.1095 92.3761 27.637 93.0847 27.1646C93.7934 26.5741 94.3839 25.9835 94.7382 25.0387C95.2107 24.212 95.3288 23.149 95.3288 22.086C95.3288 20.905 95.0926 19.9601 94.7382 19.1334C94.3839 18.4248 93.9115 17.7161 93.2028 17.2437C92.4942 16.7713 91.6675 16.2989 90.7226 16.0626C89.7778 15.7083 88.7148 15.4721 87.5338 15.1178C86.1165 14.7635 84.9354 14.4092 83.7544 14.0548C82.5733 13.5824 81.6285 13.11 80.9198 12.5195C80.0931 11.9289 79.5026 11.2203 79.0301 10.3936C78.5577 9.56683 78.3215 8.62197 78.3215 7.55902C78.3215 5.1969 79.1482 3.42531 80.6836 2.00804C82.219 0.59077 84.463 0.000244141 87.4157 0.000244141C89.5416 0.000244141 91.3132 0.354555 92.8485 1.06319C94.3839 1.77183 95.4468 2.83479 96.0374 4.48827L94.6201 5.1969C94.0296 3.89773 93.0848 2.95289 91.7856 2.36236C90.4864 1.77183 89.0691 1.53562 87.2975 1.53562C85.0535 1.53562 83.1638 2.12615 81.8647 3.30721C80.5655 4.48827 79.8569 5.90553 79.8569 7.79522C79.8569 8.74007 80.0931 9.56682 80.4474 10.2755C80.8017 10.9841 81.3923 11.4565 82.1009 11.9289C82.8095 12.4014 83.6363 12.7557 84.6992 13.11C85.6441 13.4643 86.8251 13.7005 88.0062 14.0548C89.4235 14.4092 90.6045 14.7635 91.6675 15.2359C92.7304 15.5902 93.6753 16.1808 94.3839 16.7713C95.0925 17.3618 95.6831 18.1885 96.1555 19.0153C96.9822 19.842 97.1004 21.0231 97.1004 22.3223Z"
                fill="white"
              />
              <path
                d="M118.478 26.6925C118.005 27.5192 117.415 28.1098 116.706 28.5822C115.997 29.0546 115.289 29.4089 114.462 29.6451C113.635 29.8813 112.927 29.9995 112.1 30.1176C111.273 30.2357 110.447 30.2357 109.738 30.2357C107.14 30.2357 105.014 29.527 103.36 28.1098C101.707 26.6925 100.998 24.8028 100.998 22.2045C100.998 21.0234 101.116 19.9605 101.47 18.8975C101.825 17.8346 102.297 16.8897 103.006 16.063C103.714 15.2362 104.659 14.6457 105.722 14.1733C106.785 13.7008 108.203 13.4646 109.738 13.4646H118.596V8.50418C118.596 6.37827 118.005 4.72479 116.942 3.42562C115.761 2.24456 113.99 1.53594 111.509 1.53594C109.738 1.53594 108.203 1.77215 106.903 2.36268C105.604 2.95321 104.541 3.66184 103.714 4.72479L102.533 3.77994C103.596 2.59888 104.777 1.77214 106.077 1.0635C107.376 0.472974 109.147 0.118652 111.509 0.118652C112.809 0.118652 113.99 0.236762 115.053 0.472974C116.116 0.709186 117.06 1.18162 117.887 1.77215C118.714 2.36268 119.304 3.30752 119.777 4.37047C120.249 5.43343 120.486 6.73258 120.486 8.38607V29.6451H118.95V26.5744H118.478V26.6925ZM109.974 14.8819C107.848 14.8819 105.958 15.4724 104.541 16.6535C103.124 17.8345 102.297 19.6061 102.297 22.2045C102.297 24.2123 102.888 25.8658 104.187 27.1649C105.486 28.4641 107.376 29.0546 109.856 29.0546C110.801 29.0546 111.746 28.9365 112.809 28.7003C113.872 28.4641 114.698 28.1098 115.525 27.6373C116.352 27.1649 117.06 26.4563 117.533 25.6295C118.123 24.8028 118.36 23.858 118.36 22.6769V15H109.974V14.8819Z"
                fill="white"
              />
              <path
                d="M150.366 29.7637H148.712L140.917 3.42609H140.799L133.004 29.7637H131.351L123.319 0.591553H124.973L132.295 27.4016H132.414L140.09 0.709648H141.744L149.421 27.4016H149.539L156.743 0.709648H158.279L150.366 29.7637Z"
                fill="white"
              />
              <path
                d="M33.0865 86.2183C34.1495 83.8562 34.8581 81.2579 35.2124 78.3052C35.5667 75.3526 35.6848 72.3999 35.6848 69.4473C35.6848 66.2584 35.5667 63.1876 35.2124 60.235C34.8581 57.2823 34.2676 54.684 33.2046 52.44C32.1417 50.196 30.7244 48.4244 28.8347 47.1252C26.945 45.8261 24.4648 45.1174 21.394 45.1174C19.15 45.1174 17.1422 45.4717 15.3706 46.2985C13.599 47.1252 11.9455 48.4244 10.5283 50.196C10.4102 50.196 10.4101 50.196 10.4101 50.196C10.4101 50.196 10.4102 50.196 10.2921 50.196V45.708H2.49707V101.218V160.389H10.2921L10.4101 101.218V89.1709H10.6464C13.3628 92.3598 16.7879 93.8952 20.6854 93.8952C23.8742 93.8952 26.4726 93.1866 28.4804 91.7693C30.4882 90.352 32.0235 88.4623 33.0865 86.2183ZM27.6536 75.9431C27.4174 77.9509 27.0631 79.7225 26.3544 81.1397C25.7639 82.6751 24.8191 83.8562 23.638 84.801C22.457 85.7459 20.9216 86.1002 18.9138 86.1002C16.906 86.1002 15.3706 85.6278 14.1896 84.6829C13.0085 83.7381 12.1817 82.4389 11.5912 81.0216C11.0007 79.4863 10.6464 77.8328 10.5283 76.0612C10.4102 74.2896 10.2921 72.518 10.2921 70.7464C10.2921 68.8567 10.2921 66.8489 10.2921 64.723C10.2921 62.5971 10.6464 60.5893 11.1188 58.8177C11.5912 57.0461 12.5361 55.5108 13.7171 54.3297C14.8982 53.1486 16.6698 52.5581 19.0319 52.5581C21.0397 52.5581 22.5751 53.0305 23.7561 53.9754C24.9372 54.9202 25.7639 56.1013 26.3544 57.6367C26.945 59.172 27.4174 60.9436 27.5355 63.0695C27.7717 65.0774 27.7717 67.3214 27.7717 69.5654C28.0079 71.8094 27.8898 73.9353 27.6536 75.9431Z"
                fill="white"
              />
              <path
                d="M68.5175 89.7608L68.8718 89.997V93.4221H76.6668V59.5257C76.6668 56.8093 76.1944 54.4471 75.3677 52.6755C74.5409 50.7858 73.3599 49.3686 71.8245 48.3056C70.2891 47.2427 68.5175 46.4159 66.6278 45.9435C64.62 45.4711 62.4941 45.2349 60.2501 45.2349C56.9431 45.2349 53.9905 45.9435 51.3922 47.3608C48.6757 48.778 46.786 50.7858 45.4869 53.3842C46.5498 53.9747 47.4947 54.6833 48.5576 55.2739C49.5025 55.8644 50.5654 56.4549 51.6284 57.0455C52.337 55.392 53.5181 54.2109 55.1716 53.5023C56.8251 52.7936 58.5966 52.4393 60.3682 52.4393C63.2028 52.4393 65.3287 53.0299 66.7459 54.329C68.1632 55.5101 68.8718 57.2817 68.8718 59.5257V65.431H60.132C54.3448 65.431 50.093 66.8482 47.4947 69.6828C44.8964 72.5173 43.5972 75.9424 43.5972 80.1942C43.5972 82.0839 43.8334 83.8555 44.4239 85.509C45.0145 87.1625 45.8412 88.6978 46.9042 89.997C48.0852 91.2962 49.5025 92.241 51.1559 93.0678C52.8094 93.8945 54.9353 94.1307 57.1793 94.1307C59.6596 94.1307 61.9036 93.7764 63.9114 93.0678C65.8011 92.241 67.3365 91.178 68.5175 89.7608ZM53.0456 84.8003C51.6284 83.5012 50.9197 81.7296 50.9197 79.6037C50.9197 76.8873 51.7465 74.8795 53.2819 73.6984C54.9354 72.5173 56.9431 71.9268 59.4234 71.9268H68.7538V78.5407C68.7538 81.6115 67.927 83.7374 66.1554 84.9185C64.3838 86.0995 62.1398 86.8081 59.4234 86.8081C56.5888 86.69 54.4629 86.0995 53.0456 84.8003Z"
                fill="white"
              />
              <path
                d="M106.902 85.1549C105.367 86.336 103.241 86.8084 100.643 86.8084C98.0443 86.8084 95.9183 86.2179 94.2648 85.0368C92.6114 83.8557 91.1941 82.3204 90.1311 80.1945L83.7534 83.8557C85.2888 87.1627 87.2966 89.643 90.1311 91.4146C92.8476 93.1861 96.2727 94.0129 100.406 94.0129C105.603 94.0129 109.619 92.7137 112.571 90.1154C115.524 87.5171 116.941 84.092 116.941 79.8402C116.941 77.7142 116.705 75.8246 116.114 74.2892C115.524 72.7538 114.697 71.4546 113.634 70.2736C112.453 69.0925 111.154 68.2658 109.382 67.439C107.729 66.7304 105.721 66.0218 103.477 65.5493C102.06 65.195 100.643 64.7226 99.3434 64.3683C98.0443 64.014 96.8632 63.5416 95.9184 63.0691C94.9735 62.5967 94.1468 62.0062 93.5562 61.2975C92.9657 60.5889 92.7295 59.644 92.7295 58.5811C92.7295 56.9276 93.32 55.3922 94.383 54.0931C95.4459 52.7939 97.4537 52.0853 100.406 52.0853C104.776 52.0853 107.847 53.9749 109.737 57.8724L115.76 54.0931C114.697 51.1404 112.926 48.8964 110.563 47.2429C108.201 45.5894 104.776 44.7627 100.524 44.7627C95.6821 44.7627 91.9027 45.9438 89.1863 48.424C86.4699 50.7861 85.0526 54.2112 85.0526 58.3449C85.0526 60.3527 85.4069 62.1243 86.1155 63.5415C86.8242 64.9588 87.8871 66.258 89.1863 67.3209C90.4855 68.3839 92.139 69.3287 94.0286 70.0374C95.9183 70.746 97.9261 71.4546 100.288 72.0452C101.587 72.3995 102.768 72.7538 103.831 73.1081C104.894 73.4625 105.839 73.9348 106.666 74.4073C107.493 74.8797 108.083 75.5883 108.556 76.297C109.028 77.1237 109.264 78.0686 109.264 79.2496C109.146 82.2023 108.438 83.9739 106.902 85.1549Z"
                fill="white"
              />
              <path
                d="M145.877 85.1549C144.341 86.336 142.216 86.8084 139.617 86.8084C137.019 86.8084 134.893 86.2179 133.239 85.0368C131.586 83.8557 130.169 82.3204 129.106 80.1945L122.728 83.8557C124.263 87.1627 126.271 89.643 129.106 91.4146C131.822 93.1861 135.247 94.0129 139.381 94.0129C144.578 94.0129 148.593 92.7137 151.546 90.1154C154.499 87.5171 155.916 84.092 155.916 79.8402C155.916 77.7142 155.68 75.8246 155.089 74.2892C154.499 72.7538 153.672 71.4546 152.609 70.2736C151.428 69.0925 150.129 68.2658 148.357 67.439C146.704 66.7304 144.696 66.0218 142.452 65.5493C141.034 65.195 139.617 64.7226 138.318 64.3683C137.019 64.014 135.838 63.5416 134.893 63.0691C133.948 62.5967 133.121 62.0062 132.531 61.2975C131.94 60.5889 131.704 59.644 131.704 58.5811C131.704 56.9276 132.295 55.3922 133.358 54.0931C134.421 52.7939 136.428 52.0853 139.381 52.0853C143.751 52.0853 146.822 53.9749 148.711 57.8724L154.735 54.0931C153.672 51.1404 151.9 48.8964 149.538 47.2429C147.176 45.5894 143.751 44.7627 139.499 44.7627C134.657 44.7627 130.877 45.9438 128.161 48.424C125.444 50.7861 124.027 54.2112 124.027 58.3449C124.027 60.3527 124.382 62.1243 125.09 63.5415C125.799 64.9588 126.862 66.258 128.161 67.3209C129.46 68.3839 131.114 69.3287 133.003 70.0374C134.893 70.746 136.901 71.4546 139.263 72.0452C140.562 72.3995 141.743 72.7538 142.806 73.1081C143.869 73.4625 144.814 73.9348 145.641 74.4073C146.467 74.8797 147.058 75.5883 147.53 76.297C148.003 77.0056 148.239 78.0686 148.239 79.2496C148.239 82.2023 147.412 83.9739 145.877 85.1549Z"
                fill="white"
              />
              <path
                d="M172.569 45.707H164.774V93.4218H172.569V45.707Z"
                fill="white"
              />
              <path
                d="M208.474 69.5651C209.419 66.1401 210.363 62.9512 211.308 59.8804C212.253 56.8097 213.08 53.9751 213.788 51.4949C214.497 49.0147 215.206 47.125 215.678 45.7077H207.293C206.938 46.6526 206.584 47.9517 206.112 49.8414C205.639 51.7311 205.167 53.7389 204.576 55.7467C204.104 57.8726 203.513 59.8804 203.041 61.7701C202.568 63.6598 202.096 65.0771 201.86 65.9038C201.624 66.4944 201.387 67.5573 201.033 69.0927C200.679 70.628 200.206 72.2815 199.734 74.0531C199.261 75.8247 198.907 77.4782 198.435 79.0136C197.962 80.549 197.726 81.6119 197.49 82.2024H197.254L192.766 65.9038C192.411 65.0771 192.057 63.6598 191.585 61.7701C191.112 59.8804 190.522 57.8726 190.049 55.7467C189.459 53.6208 188.868 51.613 188.396 49.7233C187.923 47.8336 187.451 46.4163 187.215 45.5896H178.829C179.302 46.8888 179.892 48.8966 180.719 51.3768C181.546 53.857 182.372 56.6916 183.317 59.7623C184.262 62.8331 185.207 66.14 186.152 69.447C187.097 72.8721 188.041 76.0609 188.986 79.1317C189.931 82.2024 190.758 85.037 191.466 87.5172C192.293 89.9974 192.884 91.8871 193.356 93.1863H201.269C201.742 91.8871 202.332 89.9974 203.159 87.5172C203.986 85.037 204.812 82.2024 205.757 79.1317C206.466 76.179 207.411 72.8721 208.474 69.5651Z"
                fill="white"
              />
              <path
                d="M222.056 88.3434C223.473 90.3512 225.363 91.7685 227.607 92.5952C229.851 93.5401 232.567 93.8944 235.756 93.8944C238.945 93.8944 241.897 93.0677 244.378 91.4142C246.858 89.7607 248.866 87.5167 250.165 84.6821L243.787 81.2571C242.842 82.7924 241.661 83.9735 240.244 85.1545C238.827 86.2175 237.173 86.808 235.52 86.808C233.512 86.808 231.74 86.4537 230.559 85.627C229.26 84.8002 228.315 83.7373 227.607 82.4381C226.898 81.139 226.426 79.4855 226.189 77.7139C225.953 75.8242 225.835 73.9345 225.835 71.8086H251.7V64.3679C251.7 58.3445 250.283 53.6203 247.448 50.1952C244.614 46.7701 240.48 44.9985 235.047 44.9985C231.622 44.9985 228.788 45.7072 226.662 47.1244C224.418 48.5417 222.764 50.4314 221.465 52.6754C220.166 55.0375 219.339 57.6359 218.867 60.5885C218.394 63.5412 218.158 66.4938 218.158 69.4465C218.158 73.8164 218.513 77.5958 219.221 80.6665C219.93 83.7373 220.638 86.3356 222.056 88.3434ZM227.961 55.8643C229.26 53.5022 231.504 52.3211 234.811 52.3211C237.646 52.3211 239.89 53.3841 241.425 55.6281C242.96 57.8721 243.669 61.179 243.669 65.549H225.835C225.953 61.5334 226.662 58.3445 227.961 55.8643Z"
                fill="white"
              />
              <path
                d="M50.8011 116.099C49.62 114.8 48.2027 113.855 46.5493 113.264C44.8958 112.556 43.1242 112.201 41.2345 112.201C38.8724 112.201 36.7465 112.674 34.8568 113.737C32.849 114.682 31.1955 116.217 29.8963 117.989H29.542V112.674H21.6289V160.389H29.4239V129.445C29.4239 126.61 30.2506 124.248 31.786 122.595C33.4395 120.941 35.4473 119.996 38.1637 119.996C40.9983 119.996 43.2423 120.823 44.6596 122.477C46.0768 124.13 46.9036 126.374 46.9036 129.327V160.507H54.6986V126.728C54.6986 124.484 54.3443 122.477 53.6356 120.705C52.927 118.933 51.9821 117.398 50.8011 116.099Z"
                fill="white"
              />
              <path
                d="M87.1789 116.807C86.7065 118.697 86.2341 120.705 85.6436 122.713C85.1711 124.839 84.5806 126.846 84.1082 128.736C83.6358 130.626 83.1634 132.043 82.9271 132.87C82.6909 133.46 82.4547 134.523 82.1004 136.059C81.7461 137.594 81.2736 139.248 80.8012 141.019C80.3288 142.791 79.9745 144.444 79.502 145.98C79.0296 147.515 78.7934 148.578 78.5572 149.169H78.321L73.833 132.87C73.4787 132.043 73.1243 130.626 72.6519 128.736C72.1795 126.846 71.589 124.839 71.1165 122.713C70.526 120.587 69.9355 118.579 69.463 116.689C68.9906 114.8 68.5182 113.382 68.282 112.556H59.8965C60.3689 113.855 60.9594 115.863 61.7862 118.343C62.6129 120.823 63.4396 123.658 64.3845 126.728C65.3293 129.799 66.2742 133.106 67.219 136.413C68.1639 139.838 69.1087 143.027 70.0536 146.098C70.9984 149.168 71.8252 152.003 72.5338 154.483C73.3605 156.963 73.9511 158.853 74.4235 160.152H82.3366C82.809 158.853 83.3995 156.963 84.2263 154.483C85.053 152.003 85.8798 149.168 86.8246 146.098C87.7695 143.027 88.7143 139.72 89.6592 136.413C90.604 132.988 91.5488 129.799 92.4937 126.728C93.4385 123.658 94.2653 120.823 94.9739 118.343C95.6826 115.863 96.3912 113.973 96.8636 112.556H88.4781C88.0057 113.619 87.6514 115.036 87.1789 116.807Z"
                fill="white"
              />
              <path
                d="M115.879 112.083C112.454 112.083 109.619 112.792 107.493 114.209C105.249 115.626 103.596 117.516 102.297 119.76C100.998 122.122 100.171 124.72 99.6984 127.673C99.226 130.626 98.9897 133.578 98.9897 136.531C98.9897 140.901 99.3441 144.68 100.053 147.751C100.761 150.822 101.824 153.302 103.242 155.31C104.659 157.318 106.549 158.735 108.793 159.562C111.037 160.506 113.753 160.861 116.942 160.861C120.131 160.861 123.083 160.034 125.564 158.381C128.044 156.727 130.052 154.483 131.351 151.648L124.973 148.223C124.028 149.759 122.847 150.94 121.43 152.121C120.013 153.184 118.359 153.774 116.706 153.774C114.698 153.774 112.926 153.42 111.745 152.593C110.446 151.767 109.501 150.704 108.793 149.404C108.084 148.105 107.611 146.452 107.375 144.68C107.139 142.791 107.021 140.901 107.021 138.775H132.886V131.334C132.886 125.311 131.469 120.587 128.634 117.162C125.445 113.855 121.312 112.083 115.879 112.083ZM106.903 132.633C107.021 128.5 107.73 125.311 109.029 122.949C110.328 120.587 112.572 119.406 115.879 119.406C118.713 119.406 120.957 120.469 122.493 122.713C124.028 124.957 124.737 128.264 124.737 132.633H106.903Z"
                fill="white"
              />
              <path
                d="M168.79 137.358C167.609 136.295 166.31 135.35 164.538 134.524C162.885 133.815 160.877 133.106 158.633 132.634C157.216 132.28 155.798 131.807 154.499 131.453C153.2 131.098 152.019 130.626 151.074 130.154C150.129 129.681 149.303 129.091 148.712 128.382C148.121 127.673 147.885 126.729 147.885 125.666C147.885 124.012 148.476 122.477 149.539 121.178C150.602 119.878 152.61 119.17 155.562 119.17C159.932 119.17 163.003 121.059 164.893 124.957L170.916 121.178C169.853 118.225 168.081 115.981 165.719 114.327C163.357 112.674 159.932 111.847 155.68 111.847C150.838 111.847 147.059 113.028 144.342 115.508C141.626 117.871 140.208 121.296 140.208 125.429C140.208 127.437 140.563 129.209 141.271 130.626C141.98 132.043 143.043 133.342 144.342 134.405C145.641 135.468 147.295 136.413 149.184 137.122C151.074 137.83 153.082 138.539 155.444 139.13C156.743 139.484 157.924 139.838 158.987 140.193C160.05 140.547 160.995 141.019 161.822 141.492C162.649 141.964 163.239 142.673 163.711 143.381C164.184 144.208 164.42 145.153 164.42 146.334C164.42 148.814 163.711 150.704 162.176 151.767C160.641 152.948 158.515 153.42 155.916 153.42C153.318 153.42 151.192 152.83 149.539 151.649C147.885 150.468 146.468 148.932 145.405 146.807L139.027 150.468C140.563 153.775 142.571 156.255 145.405 158.027C148.121 159.798 151.547 160.625 155.68 160.625C160.877 160.625 164.893 159.326 167.845 156.727C170.798 154.129 172.215 150.704 172.215 146.452C172.215 144.326 171.979 142.437 171.388 140.901C170.68 139.838 169.853 138.539 168.79 137.358Z"
                fill="white"
              />
              <path
                d="M191.112 151.649C190.285 150.704 189.931 149.169 189.931 147.161V119.052H196.663V112.674H189.931V100.391H182.136V112.674H176.821V119.052H182.136V149.523C182.136 152.594 183.08 155.192 184.852 157.318C186.742 159.444 189.458 160.507 193.119 160.507H197.489V153.302H194.891C193.119 153.184 191.82 152.712 191.112 151.649Z"
                fill="white"
              />
              <path
                d="M258.55 116.217C257.369 114.918 255.951 113.973 254.298 113.264C252.644 112.556 250.873 112.201 248.983 112.201C246.267 112.201 243.786 112.674 241.661 113.619C239.535 114.564 237.645 116.099 235.755 118.225H235.637C234.456 116.453 232.921 114.918 230.913 113.855C228.905 112.674 226.661 112.201 223.945 112.201C219.22 112.201 215.559 114.091 212.843 117.871H212.725V112.792H204.812V160.389H212.607V132.279C212.607 128.618 213.315 125.665 214.614 123.421C215.914 121.177 218.157 119.996 221.228 119.996C222.882 119.996 224.299 120.351 225.362 120.941C226.425 121.532 227.37 122.359 227.96 123.54C228.551 124.603 229.023 125.902 229.259 127.319C229.496 128.736 229.614 130.39 229.614 132.043V160.389H237.409V131.925C237.409 128.264 238.117 125.311 239.417 123.185C240.716 121.059 242.96 119.996 246.03 119.996C247.684 119.996 249.101 120.351 250.164 120.941C251.227 121.532 252.054 122.359 252.763 123.421C253.353 124.484 253.825 125.784 254.062 127.201C254.298 128.736 254.416 130.272 254.416 132.043V160.389H262.211V126.61C262.211 124.484 261.857 122.477 261.148 120.705C260.676 118.933 259.731 117.516 258.55 116.217Z"
                fill="white"
              />
              <path
                d="M287.958 112.083C284.533 112.083 281.699 112.792 279.573 114.209C277.329 115.626 275.675 117.516 274.376 119.76C273.077 122.122 272.25 124.72 271.778 127.673C271.306 130.626 271.069 133.578 271.069 136.531C271.069 140.901 271.424 144.68 272.132 147.751C272.841 150.822 273.904 153.302 275.321 155.31C276.738 157.318 278.628 158.735 280.872 159.562C283.116 160.506 285.833 160.861 289.021 160.861C292.21 160.861 295.163 160.034 297.643 158.381C300.123 156.727 302.131 154.483 303.43 151.648L297.053 148.223C296.108 149.759 294.927 150.94 293.509 152.121C292.092 153.184 290.439 153.774 288.785 153.774C286.777 153.774 285.006 153.42 283.825 152.593C282.526 151.767 281.581 150.704 280.872 149.404C280.163 148.105 279.691 146.452 279.455 144.68C279.219 142.791 279.101 140.901 279.101 138.775H304.73V131.334C304.73 125.311 303.312 120.587 300.478 117.162C297.525 113.855 293.391 112.083 287.958 112.083ZM279.101 132.633C279.219 128.5 279.927 125.311 281.226 122.949C282.526 120.587 284.77 119.406 288.077 119.406C290.911 119.406 293.155 120.469 294.691 122.713C296.226 124.957 296.935 128.264 296.935 132.633H279.101Z"
                fill="white"
              />
              <path
                d="M342.051 116.099C340.87 114.8 339.452 113.855 337.799 113.264C336.145 112.556 334.374 112.201 332.484 112.201C330.122 112.201 327.996 112.674 326.106 113.737C324.099 114.682 322.445 116.217 321.146 117.989H320.91V112.674H312.997V160.389H320.792V129.445C320.792 126.61 321.618 124.248 323.154 122.595C324.807 120.941 326.815 119.996 329.531 119.996C332.366 119.996 334.61 120.823 336.027 122.477C337.445 124.13 338.271 126.374 338.271 129.327V160.507H346.066V126.728C346.066 124.484 345.712 122.477 345.003 120.705C344.177 118.933 343.232 117.398 342.051 116.099Z"
                fill="white"
              />
              <path
                d="M369.925 153.184C368.153 153.184 366.972 152.712 366.145 151.649C365.319 150.704 364.964 149.169 364.964 147.161V119.052H371.696V112.674H364.964V100.391H357.169V112.674H351.973V119.052H357.287V149.523C357.287 152.594 358.232 155.192 360.004 157.318C361.894 159.444 364.61 160.507 368.271 160.507H372.641V153.302H369.925V153.184Z"
                fill="white"
              />
              <path
                d="M10.6459 211.882C8.40187 211.882 6.63029 211.409 5.33112 210.582C4.03195 209.756 2.96899 208.693 2.26036 207.275C1.55172 205.858 1.07932 204.323 0.843109 202.551C0.606897 200.78 0.48877 198.89 0.48877 196.882C0.48877 194.992 0.606897 193.221 0.843109 191.449C1.07932 189.678 1.55172 188.024 2.26036 186.725C2.96899 185.308 4.03196 184.127 5.44923 183.3C6.8665 182.473 8.6381 182.001 10.8821 182.001C14.8977 182.001 17.6141 183.654 18.7952 187.079L17.3779 187.788C16.9055 186.489 16.1969 185.544 15.0158 184.717C13.8348 183.89 12.5356 183.536 10.8821 183.536C8.87431 183.536 7.33894 183.89 6.15788 184.717C4.97682 185.544 4.03195 186.607 3.44142 187.906C2.85089 189.205 2.37846 190.622 2.26036 192.276C2.02415 193.929 2.02417 195.465 2.02417 197.118C2.02417 198.654 2.14225 200.189 2.26036 201.843C2.49657 203.496 2.85089 204.913 3.44142 206.212C4.03195 207.512 4.8587 208.575 6.03976 209.519C7.22082 210.346 8.7562 210.819 10.764 210.819C12.4175 210.819 13.7166 210.464 14.8977 209.638C16.0788 208.811 16.7874 207.866 17.2598 206.567L18.6771 207.157C18.0865 208.811 17.0236 210.11 15.6064 210.937C14.1891 211.763 12.6537 211.882 10.6459 211.882Z"
                fill="white"
              />
              <path
                d="M32.3775 182.001C33.9129 182.001 35.212 182.237 36.3931 182.709C37.5741 183.182 38.519 183.772 39.3457 184.599C40.4087 185.78 41.2354 187.316 41.5898 189.323C41.9441 191.331 42.1803 193.929 42.1803 197.118C42.1803 199.244 42.0622 201.134 41.9441 202.787C41.826 204.441 41.4717 205.74 40.9992 206.921C39.582 210.228 36.6293 212 32.3775 212C29.661 212 27.6533 211.409 26.1179 210.228C24.8187 209.165 23.8739 207.512 23.4014 205.504C22.929 203.496 22.5747 200.661 22.5747 197.236C22.5747 195.229 22.5747 193.457 22.8109 192.04C22.929 190.504 23.1652 189.205 23.6377 188.142C24.3463 186.016 25.4092 184.599 27.0627 183.654C28.3619 182.473 30.2516 182.001 32.3775 182.001ZM32.2594 183.3C30.724 183.3 29.4248 183.654 28.1257 184.245C26.8265 184.835 25.9998 185.78 25.2911 187.079C24.7006 188.024 24.3463 189.323 24.2282 190.977C24.1101 192.63 23.992 194.756 23.8739 197.118C23.8739 200.425 24.1101 203.024 24.5825 204.913C25.0549 206.685 25.8817 208.102 26.9446 209.047C28.2438 210.11 30.0154 210.7 32.2594 210.7C33.7947 210.7 35.212 210.346 36.6293 209.519C38.0466 208.693 38.9914 207.63 39.4638 206.094C39.9363 204.913 40.2906 203.496 40.4087 201.961C40.5268 200.425 40.5268 198.772 40.5268 197C40.5268 194.402 40.4087 192.394 40.1725 190.859C39.9363 189.323 39.582 188.142 39.2276 187.434C38.6371 186.134 37.6922 185.19 36.5112 184.481C35.212 183.654 33.7947 183.3 32.2594 183.3Z"
                fill="white"
              />
              <path
                d="M64.9748 191.332C64.9748 188.852 64.2661 186.844 62.967 185.427C61.6678 184.009 59.7781 183.301 57.2979 183.301C55.9987 183.301 54.9358 183.537 53.8728 184.009C52.8099 184.482 51.9831 185.072 51.2745 185.899C50.5658 186.726 49.9753 187.671 49.621 188.734C49.2667 189.797 49.0305 190.978 49.0305 192.159V211.41H47.4951V182.238H49.0305V186.726H49.1486C49.9753 185.072 51.0383 183.773 52.5737 183.065C54.109 182.356 55.6444 181.884 57.1798 181.884C60.2505 181.884 62.6127 182.71 64.0299 184.364C65.5653 186.017 66.274 188.143 66.274 190.741V211.292H64.9748V191.332Z"
                fill="white"
              />
              <path
                d="M76.0766 211.528H74.5413V183.537H71.1162V182.238H74.5413V175.034C74.5413 172.671 75.0137 171.018 75.9585 169.955C76.9034 168.892 78.3207 168.42 80.2103 168.42H82.4544V169.837H80.0922C79.1474 169.837 78.4388 169.955 77.8482 170.309C77.2577 170.664 76.9034 171.018 76.6672 171.609C76.431 172.081 76.3129 172.672 76.1948 173.38C76.1948 174.089 76.0766 174.679 76.0766 175.388V182.356H82.2182V183.655H76.0766V211.528Z"
                fill="white"
              />
              <path
                d="M94.7366 211.882C92.4925 211.882 90.6028 211.528 89.1856 210.701C87.7683 209.875 86.7053 208.812 85.9967 207.513C85.2881 206.095 84.8156 204.56 84.5794 202.552C84.3432 200.662 84.2251 198.536 84.2251 196.174C84.2251 194.403 84.3432 192.631 84.6976 190.86C84.9338 189.088 85.5243 187.553 86.2329 186.253C86.9415 184.954 88.0045 183.891 89.3037 183.065C90.6028 182.238 92.2563 181.884 94.3822 181.884C96.5081 181.884 98.1616 182.238 99.4608 183.065C100.76 183.773 101.705 184.836 102.413 186.017C103.122 187.198 103.476 188.616 103.713 190.151C103.949 191.686 104.067 193.34 104.067 194.875V196.765H85.8786C85.8786 199.009 85.9967 201.017 86.351 202.67C86.5872 204.442 87.0596 205.859 87.7683 207.04C88.4769 208.221 89.3037 209.048 90.4847 209.638C91.6658 210.229 93.0831 210.583 94.7366 210.583C96.39 210.583 97.8073 210.229 99.1065 209.402C100.406 208.576 101.232 207.631 101.705 206.331L103.122 206.922C102.532 208.576 101.469 209.875 99.9332 210.701C98.3978 211.528 96.7444 211.882 94.7366 211.882ZM102.413 195.466V195.111C102.413 193.694 102.295 192.277 102.177 190.86C102.059 189.442 101.705 188.143 101.114 187.08C100.524 186.017 99.697 185.072 98.634 184.364C97.5711 183.655 96.1538 183.301 94.3822 183.301C92.6106 183.301 91.1933 183.655 90.1304 184.364C89.0674 185.072 88.1226 186.017 87.5321 187.08C86.9416 188.261 86.4691 189.56 86.2329 190.978C85.9967 192.395 85.8786 193.93 85.7605 195.466H102.413Z"
                fill="white"
              />
              <path
                d="M120.721 183.418C120.249 183.418 119.894 183.3 119.54 183.3C117.06 183.3 115.052 184.127 113.635 185.898C112.099 187.67 111.391 190.032 111.391 192.866V211.409H109.855V182.237H111.391V187.315H111.627C112.454 185.308 113.517 183.89 114.934 183.182C116.351 182.355 117.887 182.001 119.54 182.001C120.013 182.001 120.603 182.001 121.076 182.001C121.548 182.001 122.02 182.119 122.493 182.237L122.138 183.772C121.666 183.654 121.194 183.536 120.721 183.418Z"
                fill="white"
              />
              <path
                d="M134.776 211.882C132.532 211.882 130.642 211.528 129.225 210.701C127.808 209.875 126.745 208.812 126.036 207.513C125.328 206.095 124.855 204.56 124.619 202.552C124.383 200.662 124.265 198.536 124.265 196.174C124.265 194.403 124.383 192.631 124.737 190.86C124.973 189.088 125.564 187.553 126.272 186.253C126.981 184.954 128.044 183.891 129.343 183.065C130.642 182.238 132.296 181.884 134.422 181.884C136.548 181.884 138.201 182.238 139.5 183.065C140.799 183.773 141.744 184.836 142.453 186.017C143.162 187.198 143.516 188.616 143.752 190.151C143.988 191.686 144.106 193.34 144.106 194.875V196.765H125.918C125.918 199.009 126.036 201.017 126.391 202.67C126.627 204.442 127.099 205.859 127.808 207.04C128.516 208.221 129.343 209.048 130.524 209.638C131.705 210.229 133.123 210.583 134.776 210.583C136.43 210.583 137.847 210.229 139.146 209.402C140.445 208.576 141.272 207.631 141.744 206.331L143.162 206.922C142.571 208.576 141.508 209.875 139.973 210.701C138.437 211.528 136.666 211.882 134.776 211.882ZM142.453 195.466V195.111C142.453 193.694 142.335 192.277 142.217 190.86C142.099 189.442 141.744 188.143 141.154 187.08C140.563 186.017 139.737 185.072 138.674 184.364C137.611 183.655 136.193 183.301 134.422 183.301C132.65 183.301 131.233 183.655 130.17 184.364C129.107 185.072 128.162 186.017 127.572 187.08C126.981 188.261 126.509 189.56 126.272 190.978C126.036 192.395 125.918 193.93 125.8 195.466H142.453Z"
                fill="white"
              />
              <path
                d="M166.546 191.332C166.546 188.852 165.837 186.844 164.538 185.427C163.239 184.009 161.349 183.301 158.869 183.301C157.57 183.301 156.507 183.537 155.444 184.009C154.381 184.482 153.554 185.072 152.845 185.899C152.137 186.726 151.546 187.671 151.192 188.734C150.837 189.797 150.601 190.978 150.601 192.159V211.41H149.066V182.238H150.601V186.726H150.719C151.546 185.072 152.609 183.773 154.144 183.065C155.68 182.356 157.215 181.884 158.751 181.884C161.821 181.884 164.183 182.71 165.601 184.364C167.136 186.017 167.845 188.143 167.845 190.741V211.292H166.546V191.332Z"
                fill="white"
              />
              <path
                d="M183.554 211.882C181.31 211.882 179.538 211.409 178.239 210.582C176.94 209.756 175.877 208.693 175.169 207.275C174.46 205.858 173.988 204.323 173.751 202.551C173.515 200.78 173.397 198.89 173.397 196.882C173.397 194.992 173.515 193.221 173.751 191.449C173.988 189.678 174.46 188.024 175.169 186.725C175.877 185.308 176.94 184.127 178.357 183.3C179.775 182.473 181.546 182.001 183.79 182.001C187.806 182.001 190.522 183.654 191.703 187.079L190.286 187.788C189.814 186.489 189.105 185.544 187.924 184.717C186.743 183.89 185.444 183.536 183.79 183.536C181.783 183.536 180.247 183.89 179.066 184.717C177.885 185.544 176.94 186.607 176.35 187.906C175.759 189.205 175.287 190.622 175.169 192.276C174.932 193.929 174.932 195.465 174.932 197.118C174.932 198.654 175.05 200.189 175.169 201.843C175.405 203.496 175.759 204.913 176.35 206.212C176.94 207.512 177.767 208.575 178.948 209.519C180.129 210.346 181.664 210.819 183.672 210.819C185.326 210.819 186.625 210.464 187.806 209.638C188.987 208.811 189.696 207.866 190.168 206.567L191.585 207.157C190.995 208.811 189.932 210.11 188.515 210.937C187.097 211.763 185.562 211.882 183.554 211.882Z"
                fill="white"
              />
              <path
                d="M205.638 211.882C203.394 211.882 201.505 211.528 200.087 210.701C198.67 209.875 197.607 208.812 196.899 207.513C196.19 206.095 195.717 204.56 195.481 202.552C195.245 200.662 195.127 198.536 195.127 196.174C195.127 194.403 195.245 192.631 195.599 190.86C195.836 189.088 196.426 187.553 197.135 186.253C197.843 184.954 198.906 183.891 200.205 183.065C201.505 182.238 203.158 181.884 205.284 181.884C207.41 181.884 209.063 182.238 210.363 183.065C211.662 183.773 212.607 184.836 213.315 186.017C214.024 187.198 214.378 188.616 214.614 190.151C214.851 191.686 214.969 193.34 214.969 194.875V196.765H196.78C196.78 199.009 196.899 201.017 197.253 202.67C197.489 204.442 197.961 205.859 198.67 207.04C199.379 208.221 200.205 209.048 201.387 209.638C202.568 210.229 203.985 210.583 205.638 210.583C207.292 210.583 208.709 210.229 210.008 209.402C211.307 208.576 212.134 207.631 212.607 206.331L214.024 206.922C213.433 208.576 212.37 209.875 210.835 210.701C209.3 211.528 207.528 211.882 205.638 211.882ZM213.197 195.466V195.111C213.197 193.694 213.079 192.277 212.961 190.86C212.843 189.442 212.489 188.143 211.898 187.08C211.307 186.017 210.481 185.072 209.418 184.364C208.355 183.655 206.938 183.301 205.166 183.301C203.394 183.301 201.977 183.655 200.914 184.364C199.851 185.072 198.906 186.017 198.316 187.08C197.725 188.261 197.253 189.56 197.017 190.978C196.78 192.395 196.662 193.93 196.544 195.466H213.197Z"
                fill="white"
              />
            </svg>

            <div className="a-text-con">
              <div>
                <h2 className="h2-style">{t`register.title`}</h2>
                <h4 className="h4-style">{t`register.title2`}</h4>
              </div>
              <a
                target="_blank"
                href={t`menu.register-link`}
                className="register-btn"
              >{t`menu.register`}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register