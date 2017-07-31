/**
 * IDomNode
 * Интерфейс модели DOM-узла
 */
export interface IDomNode {
    tag: string | undefined;    // Селектор узла
    attributes: {               // Аттрибуты узла
        [key: string]: string;
    };
    content: IDomNode[];        // Дочерние элементы узла
    text?: string;              // Текст узла
};
