import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

const SvgComponent = () => (
  <Svg width={210} height={20} fill="none">
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M0 10C0 4.477 4.477 0 10 0h38.129c4.48 0 8.272 2.946 9.544 7.007.206.66.788 1.156 1.48 1.156.69 0 1.272-.497 1.479-1.156C61.904 2.947 65.696 0 70.176 0H200c5.523 0 10 4.477 10 10s-4.477 10-9.999 10H70.176c-4.48 0-8.272-2.946-9.544-7.007-.207-.66-.789-1.156-1.48-1.156-.69 0-1.273.497-1.48 1.156C56.402 17.053 52.61 20 48.13 20H9.999C4.478 20 0 15.523 0 10Zm119.503 4.535c-.703 0-1.253-.099-1.648-.298a1.653 1.653 0 0 1-.831-.893c-.158-.397-.238-.887-.238-1.473V8.554c0-.952.213-1.654.639-2.105.425-.45 1.118-.677 2.079-.677h4.467c.683 0 1.205.037 1.567.112.36.074.542.152.542.23l-.297 1.235c-.168-.03-.665-.062-1.492-.098a93.178 93.178 0 0 0-3.599-.052h-.757c-.792 0-1.187.353-1.187 1.057v3.793c0 .338.086.598.259.781.173.184.483.275.928.275h.609c1.643 0 2.917-.017 3.823-.052.905-.034 1.467-.071 1.684-.112l.609.981c0 .05-.081.125-.244.223-.163.1-.463.189-.898.268-.436.079-1.064.12-1.885.12h-4.127l-.003.002Zm-33.103 0V6.978l-.148-1.205h6.576c.634 0 1.13.085 1.492.253.36.169.629.389.802.661.173.274.284.563.333.87.05.309.075.6.075.879v.878c0 .228-.035.484-.104.766-.07.282-.198.556-.386.818-.187.262-.46.481-.816.654-.356.173-.822.26-1.396.26h-1.514c-.624 0-1.206-.015-1.744-.045a70.18 70.18 0 0 1-1.21-.074v2.842h-1.958l-.002-.002Zm1.96-4.15h4.037c.446 0 .752-.11.92-.329.168-.217.252-.48.252-.788v-.937c0-.318-.084-.585-.252-.803-.168-.218-.47-.327-.905-.327h-4.053v3.183Zm-16.122 4.15c-.673 0-1.167-.03-1.485-.09-.316-.058-.475-.128-.475-.207l.594-1.295c.227.04.794.077 1.7.113.905.034 2.15.051 3.733.051h.282c.425 0 .727-.076.905-.23.178-.154.267-.414.267-.78v-.299c0-.347-.071-.595-.215-.744-.143-.149-.463-.223-.957-.223h-3.444c-.999 0-1.726-.186-2.182-.558-.456-.371-.683-.979-.683-1.822v-.238c0-.436.081-.837.244-1.204.163-.367.443-.662.84-.886.394-.223.939-.335 1.632-.335h4.038c.673 0 1.216.035 1.633.105.416.069.623.144.623.223l-.296 1.25c-.257-.03-.841-.062-1.752-.098-.91-.034-2.133-.051-3.667-.051l-.163-.015c-.456 0-.762.092-.92.275a1.077 1.077 0 0 0-.252.692v.252c0 .328.091.573.274.737.183.163.488.245.913.245h3.295c.634 0 1.174.064 1.618.193.446.13.787.365 1.024.707.238.342.356.846.356 1.51v.238c0 .743-.19 1.343-.572 1.799-.381.456-1.041.685-1.98.685h-4.928Zm32.093-8.747-4.349 8.747h2.167l.964-1.89h5.315l.876 1.89h2.286l-4.334-8.747h-2.925Zm3.549 5.4h-4.229l2.048-4.06h.148l2.033 4.06Zm24.716-5.4v8.747h8.105c.653 0 1.114-.018 1.381-.052.266-.036.4-.073.4-.112l-.594-1.265h-7.333v-2.364h5.552V9.268h-5.552V7.216h7.273V5.788h-9.232Zm18.807 8.746-.015-7.332h-3.86V5.774h9.709v1.428h-3.875v7.332h-1.959Zm11.771-8.746v8.747h1.959V5.788h-1.959Zm8.937 8.747V6.979l-.149-1.19h2.257l3.355 5.95 3.473-5.95h2.003v8.747h-1.959V8.988h-.163l-.579 1.294-1.87 3.362h-1.796l-1.87-3.362-.594-1.294h-.148v5.548h-1.959l-.001-.001Zm17.769-8.747v8.747h8.105c.653 0 1.114-.018 1.381-.052.267-.036.4-.073.4-.112l-.594-1.265h-7.333v-2.364h5.552V9.268h-5.552V7.216h7.274V5.788h-9.233ZM13.092 7.65v2.116l-2.829 1.139 2.829 1.144v2.117l-5.518-2.173h-.011v-2.17h.01l5.519-2.173Zm32.145 6.404V11.94l2.826-1.137-2.826-1.138V7.55l5.51 2.172h.013v2.171h-.013l-5.51 2.16ZM42.87 4.56l-3.24 11.015h1.924l3.24-11.015h-1.924ZM22 9.589A3.385 3.385 0 0 0 21.2 7.25c-.27-.3-.6-.537-.964-.692a2.627 2.627 0 0 0-1.147-.21 2.939 2.939 0 0 0-1.236.213 3.076 3.076 0 0 0-1.055.713v-.696h-1.924v7.703h1.924v-3.412c0-1.77.602-2.654 1.807-2.654.201-.009.403.03.588.116.185.085.35.215.482.377.281.371.425.838.402 1.312v4.261h1.924V9.589Zm2.45-6.215V14.39h1.924V3.374H24.45Zm11.19 10.612h1.605l2.7-7.717h-2.057l-1.515 4.63-1.561-4.63h-1.501l-1.561 4.615-1.516-4.615H28.18l2.698 7.717h1.603l1.588-4.538 1.574 4.538Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={3.48}
        x2={236.326}
        y1={-6.653}
        y2={-6.653}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.251} stopColor="#996DFF" />
        <Stop offset={0.624} stopColor="#FF876E" />
        <Stop offset={1} stopColor="#FFD072" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
