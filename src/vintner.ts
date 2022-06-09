import { BigInt } from "@graphprotocol/graph-ts"
import {
  Vintner,
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Paused,
  Transfer,
  Unpaused,
  onVintnerCreated,
  onVintnerRevealed
} from "../generated/Vintner/Vintner"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BASE_URI(...)
  // - contract.MASTER_VINTNER_TYPE(...)
  // - contract.MASTER_VINTNER_YIELD(...)
  // - contract.NUM_GEN0_VINTNERS(...)
  // - contract.NUM_GEN1_VINTNERS(...)
  // - contract.PROMOTIONAL_VINTNERS(...)
  // - contract.VINTNERS_PER_VINTAGEWINE_MINT_LEVEL(...)
  // - contract.VINTNER_PRICE_AVAX(...)
  // - contract.VINTNER_TYPE(...)
  // - contract.VINTNER_YIELD(...)
  // - contract.balanceOf(...)
  // - contract.batchedVintnersOfOwner(...)
  // - contract.currentVINTAGEWINEMintCost(...)
  // - contract.getApproved(...)
  // - contract.getType(...)
  // - contract.getYield(...)
  // - contract.isApprovedForAll(...)
  // - contract.mintingStartedAVAX(...)
  // - contract.mintingStartedVINTAGEWINE(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.paused(...)
  // - contract.startTimeAVAX(...)
  // - contract.startTimeVINTAGEWINE(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenTypes(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)
  // - contract.typeYields(...)
  // - contract.vintageWine(...)
  // - contract.vintnerTypeOracleAddress(...)
  // - contract.vintnersMinted(...)
  // - contract.vintnersMintedPromotional(...)
  // - contract.vintnersMintedWithAVAX(...)
  // - contract.vintnersMintedWithVINTAGEWINE(...)
  // - contract.wineryAddress(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleonVintnerCreated(event: onVintnerCreated): void {}

export function handleonVintnerRevealed(event: onVintnerRevealed): void {}
