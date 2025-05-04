import {writable} from "svelte/store";

export let itemid = writable("")
export let hex_color = writable("")
export let selected_id = writable('');

export interface MyDomElement {
    type: string;
    props: Record<string, any>; // Or specific prop interface
}
export let MYDOM = writable<MyDomElement>({
    type: '',
    props: {}
});

export let elements = writable<MyDomElement[]>([]);
