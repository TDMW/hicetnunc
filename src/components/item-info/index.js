import React, { useContext } from 'react'
import { PATH } from '../../constants'
import { Button, Primary, Purchase } from '../button'
import { HicetnuncContext } from '../../context/HicetnuncContext'
import { walletPreview } from '../../utils/string'
import styles from './index.module.scss'

export const ItemInfo = ({
  token_id,
  token_info,
  swaps,
  transfered,
  total_amount,
  isDetailView,
}) => {
  const context = useContext(HicetnuncContext)

  const notForSale = swaps.length === 0
  const soldOut = notForSale && transfered > 0
  const price = swaps.length > 0 && Number(swaps[0].xtz_per_objkt) / 1000000
  const edition = notForSale
    ? total_amount
    : swaps.length && `${swaps[0].objkt_amount}/${total_amount}`

  const soldOutMessage = soldOut ? 'sold out!' : 'not for sale'
  const message = notForSale ? soldOutMessage : `collect for ${price} tez`

  const handleCollect = () => {
    if (context.Tezos == null) {
      context.syncTaquito()
    } else {
      context.collect(1, swaps[0].swap_id, swaps[0].xtz_per_objkt * 1)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.edition}>
          <div className={styles.inline}>
            <p>Issuer:&nbsp;</p>
            <Button to={`${PATH.ISSUER}/${token_info.creators[0]}`}>
              <Primary>{walletPreview(token_info.creators[0])}</Primary>
            </Button>
          </div>
          <p>Edition: {edition}</p>
        </div>
      </div>

      <div className={styles.container}>
        <Button to={`${PATH.OBJKT}/${token_id}`} disabled={isDetailView}>
          <Primary>OBJKT#{token_id}</Primary>
        </Button>

        <Button onClick={() => handleCollect()} disabled={notForSale}>
          <Purchase>{message}</Purchase>
        </Button>
      </div>
      <div className={styles.container}>
        <div>
          {false && (
            <Button onClick={() => alert('report')}>
              <Primary>Report</Primary>
            </Button>
          )}

          <Button onClick={() => alert('upvote')}>
            <Primary>〇</Primary>
          </Button>
        </div>
      </div>
    </>
  )
}
