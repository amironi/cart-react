  <!-- ![Styled-wind](https://lh3.googleusercontent.com/DPGL4e29-CoYrRYtwP0hMfM8wC9kbFYSoRRHrvKbXrSTMB3avUx_9XLCdf056MZ_2y_asSysHBIo6HBGTIwAf4fe6NVbbuE2ahc_sc-IujoRoRBRbZLnrifgN7hOxMM4dg=w640) -->
<!-- > A magical implementation of Web3 protocol for Hotels -->
<!-- ![Website](https://www.shoukfi.com) -->

![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)
![Jest](https://img.shields.io/badge/tested%20with-jest-blue?style=flat-square)

# Hotel API Reference

This is the documentation for the Shoukfi api, it enables hotel owners to connect with the Shoukfi platform and to bond their bookings to tradable assets.
A Shoukfi API Key is required for calling the APIs. The API key is sourced on the Shoukfi website (www.shoukfi.com) in the partner login

### Create a Crypto Wallet

This function should be called to generate a crypto wallet.

```http
  POST https://api.shoukfi.com/v1/create_wallet/
```

##### Input

| Parameter         | Type     | Description             |
| :---------------- | :------- | :---------------------- |
| `shoukfi_api_key` | `string` | **Required**. Hotel key |

##### Outout

| Parameter  | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `private`  | `string` | private key of the wallet |
| `public`   | `string` | public key of the wallet  |
| `mnemonic` | `string` | mnemonic of the wallet    |

### Hotel on-boarding

```http
  POST https://api.shoukfi.com/v1/onboarding/
```

#### Input _json_ parameters

As part of the Hotel on-boarding process, this function should be called once to register new a hotel on the Shoukfi platform. Room typeX should be aligned to the hotel DB so Shoukfi platform can get the room type detail like max guest, premume room, etc...

| Parameter              | Type     | Description                        |
| :--------------------- | :------- | :--------------------------------- |
| `shoukfi_api_key`      | `string` | **Required**. Hotel key            |
| `hotel_wallet_address` | `string` | **Required**. Hotel Digital wallet |
| `hotel_name`           | `string` | **Required**. Hotel Name           |
| `hotel_address`        | `string` | **Required**. Hotel Address        |
| `hotel_state`          | `string` | **Required**. Hotel State          |
| `hotel_zip_code`       | `string` | **Required**. Hotel Zip            |
| `hotel_city`           | `string` | **Required**. Hotel City           |
| `hotel_country`        | `string` | **Required**. Hotel country        |
| `room_types   `        | `list`   | **Required**. Hotel rooms types    |

##### Outout

| Parameter  | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `hotel_id` | `string` | uses to privalaged calles |

### Create a Guest Key

This function should be called to generate a unique key for the hotel guest before they books tradable room/s. When the Hotel functions as the custodian for the Guest assets, this key will be used to connect to the Shoukfi platform on behalf of the Guest and should be stored in the Guests's wallet in the hotel DB.

```http
  POST https://api.shoukfi.com/v1/create_guest_key/
```

##### Input

| Parameter  | Type     | Description             |
| :--------- | :------- | :---------------------- |
| `hotel_id` | `string` | **Required**. Hotel key |

##### Outout

| Parameter   | Type     | Description               |
| :---------- | :------- | :------------------------ |
| `guest_key` | `string` | uses to privalaged calles |

### Get Wallet public address

```http
POST https://api.shoukfi.com/v1/get_public_key/
```

##### Input

| Parameter   | Type     | Description             |
| :---------- | :------- | :---------------------- |
| `guest_key` | `string` | **Required**. Hotel key |

##### Outout

| Parameter    | Type     | Description               |
| :----------- | :------- | :------------------------ |
| `public_key` | `string` | uses to privalaged calles |

### Allocate asset/s to guest digital wallet

```http
  POST https://api.shoukfi.com/v1/allocate_assets/
```

This function should be called after a guest make room/s reservation. New asset/s will be created per room per night and will be stored in the guest digital wallet

#### Input _json_ parameters

| Parameter      | Type       | Description                                    |
| :------------- | :--------- | :--------------------------------------------- |
| `hotel_id`     | `string`   | **Required**. Hotel key                        |
| `guest_wallet` | `string`   | **Required**. Guest wallet                     |
| `amount`       | `number`   | **Required**. Number of Rooms to allocate      |
| `dates`        | `list`     | **Required**. Spesified the dates for the room |
| `price`        | `number`   | **Optianal**. the price the guest was paied    |
| `room_type`    | `RoomType` | **Required**. Type of Room                     |

### Get guest's assets

This function should be called to get the list of assets that is owned by specific guest (in his wallet).

```http
  POST https://api.shoukfi.com/v1/get_assets/
```

#### Input _json_ parameters

| Parameter      | Type     | Description                    |
| :------------- | :------- | :----------------------------- |
| `guest_wallet` | `string` | **Required**. The Guest wallet |

### Peer-to-peer approve to sell

This function should be called by the seller to approve selling an asset from the seller wallet, the asset will be trasferd from the seller's wallet while calling to buyAssetP2P function.

<!--
This function should be called to sell an asset by an asset holder, the asset will be trasferd from the seller's wallet to the buyer's wallet. Make sure to call approveAssetP2P function by the buyer before calling this function. -->

```http
  POST https://api.shoukfi.com/v1/sellAssetP2P/
```

#### Input _json_ parameters

| Parameter      | Type     | Description                                    |
| :------------- | :------- | :--------------------------------------------- |
| `guest_key`    | `string` | **Required**. guest key                        |
| `asset_id`     | `number` | **Required**. Asset ID                         |
| `price`        | `number` | **Required**. Price                            |
| `amount`       | `number` | **Required**. Number of Rooms to sell          |
| `buyer_wallet` | `string` | **Required**. Seller wallet address public Key |

### Peer-to-peer asset buy

This function should be called by the buyer to approve the price for an asset from an asset holder, the asset will be trasferd from the seller's wallet while calling to sellAssetP2P function.

```http
  POST https://api.shoukfi.com/v1/approveAssetP2P/
```

#### Input _json_ parameters

| Parameter       | Type     | Description                                    |
| :-------------- | :------- | :--------------------------------------------- |
| `guest_key`     | `string` | **Required**. Guest key                        |
| `seller_wallet` | `string` | **Required**. Seller wallet address public Key |
| `asset_id`      | `number` | **Required**. Asset ID                         |
| `price`         | `number` | **Required**. Price                            |
| `amount`        | `number` | **Required**. Number of Rooms to sell          |

### Create a AMM

This function called to create a new Automatic Market Maker (AMM) for the hotel so user can buy/sell their rooms and liquidity providers can enter either assets or fungible liquidity as investors to collect yield

```http
  POST https://api.shoukfi.com/v1/create_amm/
```

#### Input _json_ parameters

| Parameter              | Type     | Description                                             |
| :--------------------- | :------- | :------------------------------------------------------ |
| `name`                 | `string` | **Required**. Hotel key                                 |
| `amm_wallet `          | `number` | **Required**. market base price                         |
| `nft_contact_address`  | `list`   | **Required**. Hotel key                                 |
| `token_address`        | `string` | **Required**. USD ERC20 Stablecoin                      |
| `expiration_threshold` | `number` | **Required**. Assets not accepted to AMM past this date |
| `amm_fee `             | `number` | **Required**. AMM Fee                                   |
| `LP_fee `              | `number` | **Required**. Liquidity providers’ fee                  |
| `room_min_price `      | `number` | **Required**. market min price                          |
| `room_max_price `      | `number` | **Required**. market max price. -1 means infinit $$$    |
| `bonding curve `       | `number` | **Required**.                                           |

##### Outout

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `amm_id`  | `string` | Market-Place Key |

### Get current Price

this function called to get the current room price from the AMM

```http
  POST https://api.shoukfi.com/v1/get_current_price/
```

#### Input _json_ parameters

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `amm_id`  | `string` | **Required**. Market-Place key |

### Hotel mint rooms to AMM

this function called to mint X rooms to the AMM

```http
  POST https://api.shoukfi.com/v1/mint_rooms_to_amm/
```

#### Input _json_ parameters

| Parameter    | Type     | Description                                    |
| :----------- | :------- | :--------------------------------------------- |
| `amm_id`     | `string` | **Required**. AMM key                          |
| `hotel_id`   | `string` | **Required**. Hotel key                        |
| `fee_wallet` | `string` | **Required**. fee wallet                       |
| `Assets`     | `number` | **Required**. Number of rooms to mint(1-1000)  |
| `Liquidity`  | `number` | **Optional** Amount of USD ERC20 Stablecoin    |
| `dates`      | `list`   | **Required**. Specified the dates for the room |
| `room_type`  | `string` | **Required**. Type of Room to publish          |

### Get AMM info

this function should be called to get a specific AMM configuration

```http
  POST https://api.shoukfi.com/v1/get_amm_info/
```

#### Input _json_ parameters

| Parameter | Type     | Description          |
| :-------- | :------- | :------------------- |
| `amm_id`  | `string` | **Required**. MP key |

##### Outout

| Parameter              | Type     | Description                               |
| :--------------------- | :------- | :---------------------------------------- |
| `amm_fee `             | `number` | Room current price                        |
| `name`                 | `string` | Hotel key                                 |
| `AMM creator           | `string` | Creator’s wallet                          |
| `nft_contact_address`  | ‘string’ | Hotel key                                 |
| `LP_fee `              | `number` | Room current price                        |
| `Number of assets      | `number` | Number of assets in pool                  |
| `room_min_price `      | `number` | Room min price                            |
| `room_max_price `      | `number` | Room max price                            |
| `room_type`            | `string` | **Required**. Type of Room to publish     |
| `token_address`        | `string` | USD ERC20 Stablecoin                      |
| `expiration_threshold` | `number` | Assets not accepted to AMM past this date |
| `bonding curve `       | `number` | **Required**.                             |

### Update prices in the AMM

this function should be called by the AMM creator to update the AMM configuration

```http
  POST https://api.shoukfi.com/v1/update_amm/
```

#### Input _json_ parameters

| Parameter         | Type     | Description            |
| :---------------- | :------- | :--------------------- |
| `amm_id`          | `string` | **Required**. MP key   |
| `fee_wallet`      | `string` | wallet for fees        |
| `amm_fee `        | `number` | new Room current price |
| `room_min_price ` | `number` | new Room min price     |
| `room_max_price ` | `number` | new Room max price     |

### Withdraw fees from the AMM

this function should be called by the creator to collect the AMM fees

```http
  POST https://api.shoukfi.com/v1/withdraw_amm/
```

#### Input _json_ parameters

| Parameter | Type     | Description          |
| :-------- | :------- | :------------------- |
| `amm_id`  | `string` | **Required**. MP key |

### Add liquidity to AMM

this function should be called to add an asset and/or liquidity to the AMM configuration

```http
  POST https://api.shoukfi.com/v1/amm_add_liquidity/
```

#### Input _json_ parameters

| Parameter             | Type     | Description                        |
| :-------------------- | :------- | :--------------------------------- |
| `amm_id`              | `string` | **Required**. MP key               |
| `nft_contact_address` | `list`   | **Optional**. Hotel key            |
| `token_address`       | `string` | **Optional**. USD ERC20 Stablecoin |

##### Outout

| Parameter  | Type     | Description                                                                                             |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------ |
| `LP Token` | `number` | ERC20 Liquidity token representing the liquidity providers stake in the pool which is eligible for fees |

### Collect fees from AMM

this function should be called by liquidity providers to collect fees for their deposited liquidity

```http
  POST https://api.shoukfi.com/v1/amm_collect_fees/
```

#### Input _json_ parameters

| Parameter           | Type     | Description             |
| :------------------ | :------- | :---------------------- |
| `amm_id`            | `string` | **Required**. MP key    |
| `LP_wallet_address` | `string` | **Required**. LP Wallet |

##### Outout

| Parameter      | Type     | Description           |
| :------------- | :------- | :-------------------- |
| `confirmation` | `string` | Hash of fee payout tx |

### Remove liquidity to AMM

this function should be called to add an asset and/or liquidity to the AMM configuration

```http
  POST https://api.shoukfi.com/v1/amm_remove_asset/
```

#### Input _json_ parameters

| Parameter             | Type     | Description                                  |
| :-------------------- | :------- | :------------------------------------------- |
| `amm_id`              | `string` | **Required**. MP key                         |
| `LP_wallet_address`   | `string` | **Required**. LP Wallet                      |
| `nft_contact_address` | `list`   | **Optional**. Hotel key to remove            |
| `token_address`       | `string` | **Optional**. USD ERC20 Stablecoin to remove |

##### Outout

| Parameter      | Type     | Description           |
| :------------- | :------- | :-------------------- | ---------- | -------- | ---------------------------------- |
| `confirmation` | `string` | Hash of fee payout tx | `LP Token` | `number` | Outstanding ERC20 Liquidity tokens |

Also need to add:

### Sell asset to AMM (Shouk it!)

this function should be called by asset owners to sell their asset to the AMM at the market price

### Sell-limit asset to AMM

this function should be called by asset owners to sell their asset to the AMM at a limit price market price

### Buy asset from AMM

this function should be called to buy an asset from the AMM at the market price

### Buy-limit asset to AMM

this function should be called to buy an asset from the AMM at the a limit price
