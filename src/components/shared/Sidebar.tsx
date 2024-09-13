"use client";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { AiOutlineBarChart } from "react-icons/ai";
import { CiBadgeDollar, CiLogout } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { MdPieChartOutlined } from "react-icons/md";
import { PiUsersThreeThin } from "react-icons/pi";
import { TbListDetails, TbSettingsCheck } from "react-icons/tb";
type MenuItem = Required<MenuProps>["items"][number];

type TSidebarType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ collapsed, setCollapsed }: TSidebarType) => {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Option 1", "quotes", <MdPieChartOutlined size={24} />),
    getItem("Option 2", "2", <AiOutlineBarChart size={24} />),
    getItem("User", "sub1", <AiOutlineBarChart size={24} />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
  ];

  console.log(items);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(!value)}
      className={`px-2 overflow-hidden ${!collapsed ? "min-w-[240px]" : ""}`}
    >
      <div>
        <div className="demo-logo-vertical pb-4 pt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="36"
            viewBox="0 0 200 36"
            fill="none"
          >
            <path
              d="M2.57777 1.48203V14.5358C2.57777 16.7443 3.0512 18.4267 3.99807 19.583C4.94495 20.7392 6.35449 21.3189 8.22672 21.3219C10.0959 21.3036 11.4962 20.7163 12.4277 19.56C13.3592 18.4038 13.8372 16.7657 13.8618 14.6459V1.48203H16.4488V14.9946C16.4488 17.7476 15.731 19.8889 14.2953 21.4183C12.8596 22.9477 10.8368 23.7125 8.22672 23.7125C5.65971 23.7125 3.65222 22.9477 2.20424 21.4183C0.756267 19.8889 0.0215198 17.7385 0 14.9671V1.48203H2.57777ZM28.4246 8.45628C30.2277 8.45628 31.5972 8.97476 32.5195 10.0163C33.4858 11.1853 33.9791 12.6708 33.9029 14.1825V23.1619H31.5004V14.444C31.5417 13.4815 31.2718 12.5311 30.7303 11.7323C30.2138 11.0257 29.3745 10.6633 28.2033 10.6449C26.723 10.6449 25.6117 11.1267 24.86 12.0994C24.1083 13.0721 23.7348 14.3936 23.7348 16.128V23.1435H21.3369V12.0076C21.3369 11.9067 21.2969 10.8453 21.217 8.82335H23.495C23.5365 10.2549 23.555 11.0395 23.555 11.1817H23.6195C24.0278 10.343 24.6887 9.6518 25.5102 9.20418C26.3975 8.70144 27.4036 8.44326 28.4246 8.45628ZM39.8793 1.48203C40.1091 1.47997 40.337 1.52401 40.5493 1.61151C40.7616 1.69902 40.9541 1.8282 41.1151 1.99133C41.2839 2.15036 41.4174 2.34269 41.5071 2.55602C41.5969 2.76934 41.6408 2.99896 41.6362 3.23018C41.6484 3.46698 41.6121 3.70377 41.5294 3.92616C41.4468 4.14854 41.3195 4.35186 41.1554 4.52377C40.9912 4.69567 40.7937 4.83255 40.5747 4.92609C40.3557 5.01963 40.1199 5.06786 39.8816 5.06786C39.6433 5.06786 39.4075 5.01963 39.1885 4.92609C38.9695 4.83255 38.772 4.69567 38.6078 4.52377C38.4437 4.35186 38.3164 4.14854 38.2338 3.92616C38.1511 3.70377 38.1147 3.46698 38.127 3.23018C38.1224 2.99896 38.1663 2.76934 38.2561 2.55602C38.3458 2.34269 38.4793 2.15036 38.648 1.99133C38.8086 1.82875 39.0002 1.6999 39.2117 1.61242C39.4232 1.52493 39.6502 1.48059 39.8793 1.48203ZM41.0829 8.82335V23.1619H38.6619V8.82335H41.0829ZM49.494 4.74891V8.82335H53.7411V10.8468H49.494V18.5047C49.494 19.6487 49.6785 20.4043 50.0474 20.7713C50.2633 20.9653 50.5163 21.114 50.7912 21.2085C51.0661 21.3031 51.3573 21.3417 51.6476 21.3219C52.3863 21.338 53.1173 21.1692 53.7734 20.831L53.8656 23.0105C52.9754 23.3684 52.0219 23.5447 51.0619 23.5289C49.5863 23.5289 48.5548 23.1664 47.9677 22.4415C47.3805 21.7165 47.0884 20.5266 47.0915 18.8718V10.8468H43.9465V8.82335H47.0915V4.74891H49.494ZM63.259 8.45628C65.3987 8.45628 67.0634 9.12618 68.267 10.4614C69.4706 11.7966 70.0793 13.6961 70.1115 16.1463V16.729H58.454C58.5356 17.9691 59.0742 19.1356 59.9665 20.0051C60.3911 20.425 60.8947 20.7575 61.4486 20.9835C62.0025 21.2094 62.5958 21.3245 63.1945 21.3219C64.0757 21.3602 64.9529 21.1818 65.7484 20.8024C66.5438 20.4231 67.2331 19.8545 67.7551 19.1471L69.572 20.5557C68.864 21.4926 67.9468 22.2528 66.8928 22.7764C65.7373 23.3052 64.4751 23.5626 63.2037 23.5289C62.2191 23.5701 61.237 23.4014 60.3232 23.0343C59.4094 22.6671 58.585 22.1099 57.9052 21.3999C56.5504 19.9258 55.8217 17.9872 55.8716 15.9903C55.838 15.0065 56.0018 14.0259 56.3533 13.1057C56.7048 12.1856 57.2371 11.3443 57.919 10.6311C58.6146 9.92626 59.4473 9.36986 60.3662 8.99593C61.2851 8.62199 62.271 8.43837 63.2636 8.45628H63.259ZM67.5107 14.7056C67.51 13.5999 67.0728 12.5388 66.2933 11.7507C65.866 11.3708 65.3672 11.0791 64.8258 10.8924C64.2843 10.7057 63.711 10.6278 63.1391 10.6633C61.9845 10.604 60.8517 10.9918 59.9783 11.7455C59.1048 12.4991 58.5585 13.5599 58.454 14.7056H67.5107ZM88.2112 0.022943V23.1848H85.8087V20.6429H85.7488C85.2431 21.5743 84.4558 22.3239 83.4984 22.7856C82.4768 23.2998 81.3461 23.5625 80.2013 23.5519C79.2422 23.5721 78.29 23.3877 77.4086 23.0109C76.5273 22.6342 75.7373 22.0739 75.0919 21.3678C73.7192 19.9121 72.9629 17.9863 72.9798 15.9903C72.9464 14.9962 73.1164 14.0057 73.4795 13.0789C73.8425 12.1521 74.3911 11.3084 75.0919 10.599C75.8096 9.89259 76.664 9.33844 77.6033 8.97013C78.5425 8.60182 79.5472 8.42701 80.5563 8.45628C81.5506 8.44223 82.5347 8.6559 83.4327 9.08076C84.3306 9.50562 85.1184 10.1303 85.7349 10.9064H85.7949V0L88.2112 0.022943ZM75.5807 16.0132C75.5515 16.7147 75.6634 17.4148 75.9096 18.0727C76.1559 18.7306 76.5316 19.3329 77.0148 19.8445C77.4929 20.3336 78.0673 20.7193 78.7021 20.9775C79.3369 21.2356 80.0183 21.3607 80.7039 21.3449C81.3823 21.3699 82.0583 21.252 82.6877 20.999C83.3171 20.746 83.8856 20.3635 84.3561 19.8766C85.3186 18.8202 85.8413 17.439 85.8179 16.0132C85.8688 14.5989 85.3529 13.2225 84.3838 12.1866C83.9095 11.6925 83.3357 11.3034 82.7001 11.0449C82.0644 10.7864 81.3811 10.6641 80.6947 10.6862C80.0208 10.6632 79.3497 10.7835 78.7263 11.0391C78.1029 11.2946 77.5414 11.6796 77.0794 12.1682C76.1199 13.2196 75.596 14.5933 75.6129 16.0132H75.5807ZM107.708 1.48203V3.87255H100.501V23.1756H97.9136V3.85878H90.706V1.48203H107.708ZM112.73 0.0137644V10.8284H112.79C113.251 10.0871 113.915 9.49191 114.704 9.11241C115.552 8.68288 116.491 8.46256 117.443 8.47004C119.251 8.47004 120.611 8.99006 121.524 10.0301C122.487 11.2008 122.98 12.6851 122.907 14.1963V23.1756H120.505V14.4578C120.548 13.495 120.278 12.5439 119.735 11.7461C119.223 11.0395 118.379 10.677 117.212 10.6587C115.732 10.6587 114.616 11.1404 113.869 12.1132C113.122 13.0859 112.744 14.4073 112.744 16.05V23.1573H110.341V0L112.73 0.0137644ZM134.537 8.47004C134.872 8.46411 135.206 8.51532 135.524 8.62146L135.372 11.0441C134.95 10.9253 134.514 10.8636 134.076 10.8606C132.677 10.8606 131.624 11.3194 130.917 12.2371C130.21 13.1547 129.857 14.4364 129.857 16.0821V23.1894H127.454V12.0076C127.454 11.7232 127.413 10.6617 127.33 8.82335H129.635C129.672 10.2549 129.695 11.0395 129.695 11.1817H129.755C130.167 10.3436 130.829 9.65275 131.651 9.20418C132.536 8.70161 133.541 8.44342 134.56 8.45628L134.537 8.47004ZM144.858 8.47004C146.991 8.47004 148.66 9.13841 149.866 10.4751C151.071 11.8119 151.685 13.7069 151.71 16.1601V16.7428H140.052C140.136 17.9814 140.673 19.1466 141.56 20.0189C142.419 20.8653 143.58 21.3388 144.788 21.3357C145.669 21.3709 146.544 21.1896 147.337 20.8079C148.13 20.4261 148.817 19.8557 149.335 19.1471L151.152 20.5557C150.446 21.4946 149.528 22.2553 148.473 22.7764C147.318 23.3066 146.055 23.5641 144.784 23.5289C143.799 23.5701 142.817 23.4014 141.903 23.0343C140.989 22.6671 140.165 22.1099 139.485 21.3999C138.127 19.9281 137.397 17.9879 137.452 15.9903C137.418 15.0065 137.582 14.0259 137.933 13.1057C138.285 12.1856 138.817 11.3443 139.499 10.6311C140.195 9.92605 141.027 9.3695 141.946 8.99555C142.865 8.6216 143.851 8.4381 144.844 8.45628L144.858 8.47004ZM149.109 14.7193C149.108 13.6137 148.671 12.5525 147.892 11.7645C147.464 11.3804 146.963 11.0849 146.419 10.8951C145.876 10.7053 145.299 10.6249 144.724 10.6587C143.57 10.6006 142.438 10.989 141.566 11.7425C140.693 12.496 140.148 13.5562 140.043 14.701L149.109 14.7193ZM160.97 8.47004C163.063 8.47004 164.588 8.95946 165.544 9.9383C166.5 10.9171 166.988 12.3992 167.006 14.3844V20.808C167.02 21.5984 167.093 22.3867 167.223 23.1665H164.917C164.811 22.9829 164.76 22.2488 164.76 21.0237H164.7C164.191 21.8133 163.485 22.4587 162.651 22.8975C161.818 23.3364 160.884 23.5539 159.941 23.5289C158.555 23.5894 157.191 23.173 156.077 22.3497C155.6 21.9914 155.216 21.5253 154.956 20.9899C154.696 20.4546 154.568 19.8653 154.583 19.271C154.54 18.4974 154.72 17.7276 155.101 17.0522C155.483 16.3768 156.05 15.8237 156.736 15.4581C158.175 14.6505 160.424 14.2467 163.483 14.2467H164.594V13.8705C164.594 11.7874 163.403 10.726 161.02 10.6862C159.443 10.6311 157.906 11.1908 156.736 12.2462L155.238 10.6587C156.782 9.20166 158.842 8.40876 160.97 8.45169V8.47004ZM157.179 19.0232C157.179 20.6383 158.237 21.4657 160.352 21.5055C160.918 21.5272 161.482 21.4325 162.01 21.2272C162.538 21.022 163.017 20.7106 163.418 20.3125C164.207 19.5141 164.604 18.3533 164.604 16.8208V16.2702H161.952C160.771 16.2203 159.595 16.4499 158.521 16.9401C158.118 17.1201 157.777 17.413 157.539 17.7829C157.3 18.1528 157.175 18.5838 157.179 19.0232ZM185.793 0V23.1619H183.39V20.6199H183.33C182.825 21.5513 182.037 22.3009 181.08 22.7627C180.06 23.2763 178.931 23.539 177.787 23.5289C176.832 23.5501 175.883 23.3684 175.003 22.9957C174.124 22.6231 173.334 22.0681 172.687 21.3678C171.316 19.9117 170.561 17.9858 170.58 15.9903C170.546 14.9965 170.715 14.0062 171.077 13.0794C171.44 12.1527 171.987 11.3088 172.687 10.599C173.406 9.89224 174.261 9.33791 175.201 8.96959C176.141 8.60128 177.146 8.42665 178.156 8.45628C179.15 8.44085 180.134 8.65392 181.032 9.07891C181.929 9.5039 182.716 10.1293 183.33 10.9064H183.39V0H185.793ZM173.167 15.9903C173.137 16.6914 173.248 17.3914 173.494 18.0492C173.739 18.7071 174.114 19.3096 174.596 19.8216C175.075 20.3102 175.649 20.6956 176.284 20.9538C176.919 21.2119 177.6 21.3372 178.285 21.3219C178.963 21.3475 179.639 21.2298 180.267 20.9767C180.896 20.7237 181.464 20.3409 181.933 19.8537C182.899 18.7994 183.422 17.4168 183.395 15.9903C183.421 15.2903 183.308 14.592 183.063 13.9354C182.818 13.2788 182.445 12.6768 181.965 12.1636C181.488 11.6656 180.91 11.274 180.269 11.0146C179.629 10.7552 178.94 10.6339 178.249 10.6587C177.574 10.6359 176.902 10.7563 176.278 11.0118C175.654 11.2673 175.092 11.6522 174.629 12.1407C173.671 13.1925 173.148 14.5663 173.167 15.9857V15.9903ZM194.637 8.45628C196.934 8.47463 198.566 9.34182 199.535 11.0579L197.529 12.3747C197.229 11.8369 196.786 11.392 196.248 11.0892C195.71 10.7863 195.098 10.6374 194.481 10.6587C193.768 10.6337 193.065 10.8258 192.466 11.2093C192.215 11.3582 192.009 11.5694 191.866 11.8221C191.722 12.0747 191.648 12.36 191.649 12.65C191.649 13.6105 192.85 14.3049 195.251 14.7331C196.975 15.039 198.197 15.5391 198.917 16.2335C199.281 16.5978 199.565 17.0336 199.751 17.5131C199.937 17.9926 200.02 18.5053 199.996 19.0186C200.023 19.6563 199.895 20.291 199.621 20.8681C199.347 21.4452 198.936 21.9474 198.423 22.3314C197.378 23.1267 195.982 23.5243 194.236 23.5243C193.087 23.5654 191.944 23.3457 190.893 22.882C189.976 22.4125 189.196 21.7156 188.629 20.8585L190.538 19.3903C191.016 20.0033 191.613 20.5137 192.295 20.8906C192.9 21.1816 193.565 21.3277 194.236 21.3174C195.039 21.351 195.833 21.1431 196.514 20.7209C196.792 20.5549 197.021 20.3191 197.178 20.0372C197.335 19.7553 197.415 19.4372 197.409 19.115C197.421 18.7938 197.341 18.4758 197.178 18.1985C197.014 17.9213 196.774 17.6964 196.487 17.5503C195.496 17.086 194.443 16.7661 193.36 16.6006C191.921 16.2947 190.879 15.8358 190.234 15.2241C189.902 14.8916 189.645 14.4935 189.478 14.0555C189.311 13.6176 189.239 13.1497 189.265 12.6821C189.259 12.1002 189.391 11.5251 189.651 11.0036C189.91 10.4821 190.29 10.0291 190.759 9.68136C191.879 8.84179 193.254 8.40942 194.656 8.45628H194.637Z"
              fill="#F8FAFC"
            />
            <path
              d="M26.2112 35.8945L24.3667 32.7193L22.559 35.8945H21.7244L19.9905 29.7461H20.8113L22.2454 34.8942L23.9424 31.9347H24.8278L26.5156 34.8942L27.959 29.7461H28.7798L27.0367 35.8945H26.2112ZM35.3741 35.8945V29.7461H39.2845V30.4894H36.1534V31.9347H38.8879V32.7056H36.1534V35.1466H39.2061V35.8945H35.3741ZM50.1305 35.8945L49.4434 34.105H46.9118L46.2247 35.8945H45.39L47.7741 29.7369H48.5811L50.9513 35.8945H50.1305ZM49.1391 33.3434L48.1568 30.8473L47.1931 33.3388L49.1391 33.3434ZM59.8559 32.6184L62.2262 35.8945H61.327L58.9521 32.6826H58.0759V35.8945H57.3289V29.7461H59.4732C59.8626 29.7485 60.2353 29.9035 60.5107 30.1775C60.786 30.4514 60.9418 30.8223 60.9442 31.2098C60.9408 31.5346 60.8301 31.8494 60.6293 32.1055C60.4285 32.3617 60.1487 32.5451 59.8329 32.6276L59.8559 32.6184ZM58.099 30.4802V31.9164H59.4824C59.582 31.9243 59.6822 31.9116 59.7767 31.8791C59.8711 31.8467 59.9578 31.7951 60.0312 31.7276C60.1047 31.6602 60.1633 31.5783 60.2034 31.4872C60.2434 31.3961 60.2641 31.2978 60.2641 31.1983C60.2641 31.0989 60.2434 31.0005 60.2034 30.9094C60.1633 30.8183 60.1047 30.7365 60.0312 30.669C59.9578 30.6016 59.8711 30.55 59.7767 30.5175C59.6822 30.485 59.582 30.4723 59.4824 30.4802H58.099ZM77.4668 35.8945V30.5078H75.8344V29.7461H79.8878V30.5078H78.2508V35.8945H77.4668ZM90.3787 35.8945V32.6826H87.2015V35.8945H86.4221V29.7461H87.2015V31.9439H90.3787V29.7461H91.1626V35.8945H90.3787ZM98.1443 35.8945V29.7461H102.059V30.4894H98.9282V31.9347H101.663V32.7056H98.9282V35.1466H101.981V35.8945H98.1443ZM119.154 35.2291C119.536 35.2297 119.914 35.1417 120.256 34.972C120.599 34.8024 120.897 34.5559 121.127 34.2518L121.736 34.7107C121.436 35.1104 121.046 35.4351 120.598 35.6589C120.15 35.8827 119.655 35.9995 119.154 36C118.604 36.0006 118.063 35.8615 117.583 35.5959C117.102 35.3304 116.698 34.9472 116.408 34.4826C116.118 34.018 115.952 33.4874 115.926 32.9411C115.9 32.3948 116.014 31.851 116.259 31.361C116.503 30.8711 116.869 30.4513 117.322 30.1415C117.775 29.8317 118.299 29.642 118.847 29.5906C119.394 29.5391 119.945 29.6276 120.448 29.8475C120.952 30.0674 121.39 30.4116 121.722 30.8473L121.104 31.3061C120.877 30.9988 120.579 30.7493 120.236 30.5779C119.893 30.4065 119.514 30.318 119.131 30.3197C118.797 30.3053 118.463 30.3583 118.151 30.4756C117.838 30.5928 117.552 30.7718 117.311 31.0018C117.07 31.2318 116.878 31.5081 116.746 31.8139C116.615 32.1197 116.548 32.4488 116.548 32.7813C116.548 33.1138 116.615 33.4429 116.746 33.7487C116.878 34.0545 117.07 34.3307 117.311 34.5607C117.552 34.7907 117.838 34.9697 118.151 35.087C118.463 35.2042 118.797 35.2573 119.131 35.2429L119.154 35.2291ZM132.273 35.8945V32.6826H129.096V35.8945H128.317V29.7461H129.096V31.9439H132.273V29.7461H133.057V35.8945H132.273ZM144.171 35.8945L143.483 34.105H140.956L140.269 35.8945H139.43L141.814 29.7369H142.626L145.033 35.8945H144.171ZM143.179 33.3434L142.243 30.8473L141.279 33.3388L143.179 33.3434ZM155.727 35.8945L152.411 31.0263V35.8945H151.641V29.7461H152.494L155.791 34.6143V29.7461H156.575V35.8945H155.727ZM166.563 31.9347H169.164V34.6602C168.86 35.068 168.466 35.4004 168.012 35.6312C167.557 35.8621 167.055 35.9851 166.545 35.9908C166.018 35.9832 165.5 35.8471 165.038 35.5944C164.576 35.3418 164.183 34.9802 163.893 34.5415C163.604 34.1027 163.427 33.6 163.378 33.0775C163.329 32.555 163.409 32.0284 163.612 31.544C163.815 31.0596 164.134 30.632 164.542 30.2986C164.949 29.9653 165.432 29.7363 165.949 29.6318C166.466 29.5273 167.001 29.5504 167.507 29.6991C168.012 29.8478 168.474 30.1176 168.851 30.4848L168.242 31.0079C168.015 30.7855 167.746 30.6099 167.451 30.491C167.156 30.3721 166.84 30.3123 166.522 30.3151C166.108 30.3128 165.699 30.4141 165.334 30.6096C164.969 30.8051 164.66 31.0887 164.434 31.4342C164.207 31.7797 164.072 32.1761 164.04 32.5872C164.007 32.9983 164.079 33.4109 164.249 33.7871C164.419 34.1634 164.68 34.4913 165.01 34.7407C165.34 34.9902 165.728 35.1533 166.138 35.2151C166.547 35.2768 166.966 35.2353 167.355 35.0943C167.745 34.9532 168.093 34.7172 168.367 34.4078V32.7056H166.55V31.9439L166.563 31.9347ZM176.081 35.8945V29.7461H179.996V30.4894H176.865V31.9347H179.595V32.7056H176.865V35.1466H179.918V35.8945H176.081Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
        <Menu
          theme="light"
          mode="vertical"
          className="sidebar-menu space-y-2"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "dashboard",
              label: <Link href="/dashboard">Dashboard</Link>,
              icon: <AiOutlineBarChart size={24} />,
            },
            {
              key: "user-management",
              icon: <PiUsersThreeThin strokeWidth={1} size={24} />,
              label: <Link href="/user-management">User Management</Link>,
            },
            {
              key: "earnings",
              icon: <CiBadgeDollar strokeWidth={1} size={24} />,
              label: <Link href="/earnings">Earnings</Link>,
            },
            {
              key: "products",
              icon: <LuClipboardList size={24} />,
              label: <Link href="/products">Produts</Link>,
            },
            {
              key: "orders",
              icon: <GoChecklist size={24} />,
              label: <Link href="/order-details">Order Details</Link>,
            },
            {
              key: "quotes",
              icon: <TbListDetails size={24} />,
              label: <Link href="/quotes-details">Quote Details</Link>,
            },
            {
              key: "settings",
              icon: <TbSettingsCheck size={24} />,
              label: <Link href="/settings">Settings</Link>,
            },
            {
              key: "logout",
              icon: <CiLogout strokeWidth={0.8} size={24} />,
              label: "Logout",
            },
          ]}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;