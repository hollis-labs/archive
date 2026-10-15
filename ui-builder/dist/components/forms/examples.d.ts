export declare const formExamples: {
    form: {
        id: string;
        type: string;
        props: {
            fields: ({
                name: string;
                label: string;
                field: {
                    id: string;
                    type: string;
                    props: {
                        type: string;
                        placeholder: string;
                    };
                };
                validation: {
                    required: boolean;
                    pattern: string;
                    min?: undefined;
                };
                helperText?: undefined;
            } | {
                name: string;
                label: string;
                field: {
                    id: string;
                    type: string;
                    props: {
                        type: string;
                        placeholder: string;
                    };
                };
                validation: {
                    required: boolean;
                    min: number;
                    pattern?: undefined;
                };
                helperText: string;
            })[];
            submitButton: {
                id: string;
                type: string;
                props: {
                    label: string;
                    variant: string;
                };
            };
        };
        actions: {
            submit: {
                type: string;
                event: string;
            };
        };
    };
    inputGroup: {
        id: string;
        type: string;
        props: {
            prefix: string;
            suffix: string;
            input: {
                id: string;
                type: string;
                props: {
                    type: string;
                    placeholder: string;
                };
            };
        };
    };
    inputGroupWithIcon: {
        id: string;
        type: string;
        props: {
            prefix: {
                id: string;
                type: string;
                props: {
                    icon: string;
                    variant: string;
                    size: string;
                };
            };
            input: {
                id: string;
                type: string;
                props: {
                    placeholder: string;
                };
            };
        };
    };
    inputOTP: {
        id: string;
        type: string;
        props: {
            length: number;
        };
        actions: {
            complete: {
                type: string;
                event: string;
            };
        };
    };
    datePicker: {
        id: string;
        type: string;
        props: {
            placeholder: string;
            format: string;
        };
        actions: {
            change: {
                type: string;
                event: string;
            };
        };
    };
    calendar: {
        id: string;
        type: string;
        props: {
            mode: string;
        };
        actions: {
            change: {
                type: string;
                event: string;
            };
        };
    };
    calendarRange: {
        id: string;
        type: string;
        props: {
            mode: string;
        };
        actions: {
            change: {
                type: string;
                event: string;
            };
        };
    };
    buttonGroup: {
        id: string;
        type: string;
        props: {
            buttons: {
                value: string;
                label: string;
                icon: string;
            }[];
            value: string;
        };
        actions: {
            change: {
                type: string;
                event: string;
            };
        };
    };
    toggle: {
        id: string;
        type: string;
        props: {
            icon: string;
            variant: string;
        };
        actions: {
            change: {
                type: string;
                event: string;
            };
        };
    };
    toggleWithLabel: {
        id: string;
        type: string;
        props: {
            label: string;
            icon: string;
            pressed: boolean;
        };
    };
    toggleGroup: {
        id: string;
        type: string;
        props: {
            type: string;
            items: {
                value: string;
                icon: string;
            }[];
            variant: string;
        };
        actions: {
            change: {
                type: string;
                event: string;
            };
        };
    };
    toggleGroupMultiple: {
        id: string;
        type: string;
        props: {
            type: string;
            items: {
                value: string;
                label: string;
            }[];
        };
    };
    item: {
        id: string;
        type: string;
        props: {
            title: string;
            description: string;
            avatar: string;
            badge: string;
        };
        actions: {
            click: {
                type: string;
                url: string;
            };
        };
    };
    itemWithIcon: {
        id: string;
        type: string;
        props: {
            title: string;
            description: string;
            icon: string;
            trailing: {
                id: string;
                type: string;
                props: {
                    icon: string;
                    variant: string;
                    size: string;
                };
            };
        };
    };
};
export declare const formComponentsList: string[];
