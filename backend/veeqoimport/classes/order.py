from .customer import Customer
from common.config import DEFAULT_DELIVERY_METHOD_ID


class Order:
    def __init__(
        self,
        customer,
        channel_id,
        customer_id,
        line_items_attributes,
        notes
    ):

        if channel_id == "":
            raise ValueError(f"channel_id: {channel_id}")
        if customer_id == "":
            raise ValueError(f"customer_id: {customer_id}")
        if not isinstance(customer, Customer):
            raise ValueError(f"customer: {customer}")
        if not isinstance(line_items_attributes, list) or len(line_items_attributes) == 0:
            raise ValueError("line_items_attributes: ", line_items_attributes)

        self.channel_id = channel_id
        self.delivery_method_id = DEFAULT_DELIVERY_METHOD_ID
        self.customer_id = customer_id
        self.customer_attributes = dict({"id": customer_id})
        self.deliver_to_attributes = customer
        self.line_items_attributes = line_items_attributes
        self.customer_note_attributes = dict({"text": notes})
