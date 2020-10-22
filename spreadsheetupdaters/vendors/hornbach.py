import re
import dateutil.parser

def format_hornbach_order(order):
    items = ""
    for item in order['line_items']:
        items += item['sellable']['sku_code'] + " "
            
    po_num = re.findall(r"\d{10}", order['customer_note']['text'])

    return [
        dateutil.parser.parse(order['created_at']).strftime(r"%d/%m/%y"),
        '',
        '',
        '',
        order['number'],
        po_num[0] if len(po_num) > 0 else 'Missing PO number',
        order['deliver_to']['first_name'] + ' ' + order['deliver_to']['last_name'],
        order['deliver_to']['address1'],
        items,
        '',
        '',
        order['subtotal_price'],
        '',
        order['total_price']
    ]
                