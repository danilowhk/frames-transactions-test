/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/finish',
    image: (
      <div style={({ color: 'black', display: 'flex', fontSize: 60})}>
          Perform transaction
      </div>
    ),

    intents: [
      <TextInput placeholder="Value (ETH" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
      // <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ],
  })
})

// app.frame('/finish', (c) => {
//   const { buttonValue, inputText, status } = c

//   console.log(c)
//   const fruit = inputText || buttonValue
//   return c.res({
//     action: '/finish',
//     image: (
//       <div style={({ color: 'black', display: 'flex', fontSize: 60})}>
//           Transaction sent
//       </div>
//     ),

//     // intents: [
//     //   <TextInput placeholder="Value (ETH" />,
//     //   <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
//     //   <Button.Transaction target="/ming">Mint</Button.Transaction>,
//     // ],
//   })
// })


app.frame('/finish', (c) => {
  console.log("Finish Called")
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
app.transaction('/send-ether', (c) => {
  console.log("Send Eth Called");
  console.log(c);
  const { inputText = '' } = c
  // Send transaction response.
  return c.send({
    chainId: 'eip155:10',
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther(inputText),
  })
})
 
// app.transaction('/mint', (c) => {
//   const { inputText } = c
//   // Contract transaction response.
//   return c.contract({
//     abi,
//     chainId: 'eip155:10',
//     functionName: 'mint',
//     args: [69420n],
//     to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
//     value: parseEther(inputText)
//   })
// })

export const GET = handle(app)
export const POST = handle(app)
