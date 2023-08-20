var schema1 = {
    "title": "headObject",
    "description": "Head object",
    "type": "object",
    "properties": {
        "GetMaxInOrderPrice": {
            "description": "",
            "type": "object",
            "properties": {
                "Orders": {
                    "description": "",
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "OrderId": {
                                "type": "integer",
                                "description": ""
                            },
                            "Order_date": {
                                "type": "date",
                                "description": ""
                            },
                            "Rexeipt_date": {
                                "type": "date",
                                "description": ""
                            },
                            "IsRich": {
                                "type": "boolean",
                                "description": "",
                                "possibleEmpry":"true" 
                            },
                            "Products": {
                                "type": "array",
                                "description": "",
                                "items": {
                                    "type": "object",
                                    "description": "",
                                    "properties": {
                                        "ProductId": {
                                            "type": "integer",
                                            "description": ""
                                        },
                                        "ProductName": {
                                            "type": "string",
                                            "description": ""
                                        },
                                        "Weight": {
                                            "type": "float",
                                            "description": ""
                                        },
                                        "Price": {
                                            "type": "float",
                                            "description": ""
                                        }
                                    },
                                    "required":["ProductId","ProductName"]
                                }
                            },
                            "Customer": {
                                "type": "object",
                                "description": "",
                                "properties": {
                                    "CustomerId": {
                                        "type": "integer",
                                        "description": ""
                                    },
                                    "FirstName": {
                                        "type": "string",
                                        "description": ""
                                    },
                                    "LastName": {
                                        "type": "string",
                                        "description": ""
                                    },
                                    "phone": {
                                        "type": "string",
                                        "description": ""
                                    },
                                    "email": {
                                        "type": "string",
                                        "description": ""
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export { schema1 }