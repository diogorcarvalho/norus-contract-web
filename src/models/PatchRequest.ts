export default interface PatchRequest {
  entityId: number
  field: string
  stringValue?: string | undefined
  intValue?: number | undefined
  floatValue?: number | undefined
  dateTimeValue?: Date | undefined
}