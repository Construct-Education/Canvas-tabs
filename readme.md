# Dynamic noscript first tabs with accessibility support

The following outlines v3 of Construct Education Canvas Tabs that are **made to look presentable on first paint** (before custom scripts get loaded in) and **or if the user has JavaScript disabled**. These have also been built with accessibility and keyboard users in mind, using dynamically generated tabindex's (tabheading => tabcontent => nextTab (repeat)) and the appropriate aria attributes.

## Problems they are solving:

1.  Custom code components having a presentable appearance before Canvas loads in custom scripts.
2.  The need for the LMS user to manually load accessibility attributes like `aria-labelled-by` and `tabindex` etc.
3.  The accessibility hurdle for keyboard users as well as visually impaired people because they especially flow like (tabheading => tabcontent => nextTab (repeat)).
4.  The refresh needed problem that previous versions had through them having a presentable structure before custom scripts as well as the way the code gets initiated.

# Functionality

## These tabs work off 3 things:

1.  Any HTML element wrapping your your entire tabs blocks with a class `init_constr--accessible-tabs`. I recommend using any block level element like a `div` as shown in the example below.
2.  Any HTML element wrapping a tab and tab content combo. I recommend using a `p` or `div` tag.
3.  Lastly you need to use this (⁞) special character to ([linked here for easy copying](https://unicode-table.com/en/205E/)) to tell the code the difference between your tab heading and content.

## HTML structure

**HTML Saved in Canvas:**

    <div class="init_constr--accessible-tabs">
    <div>Tab 1⁞Lorem ipsum commodi.</div>
    </div>

**Computed HTML Structure:**

    <div class="constr--accessible-tabs">
        <div class="constr--accessible-tabs--container">
    	    <a tabindex="01" href="#tab10" aria-controls="#tab10" id="tab10tab"
    	    class="constr--accessible-tab" aria-hidden="false" role="tab">Tab 1
    	    </a>
        </div>
        <div class="constr--accessible-tabs--content--container">
    	    <div tabindex="01" id="tab10" aria-labelledby="tab10tab"
    		     class="constr--accessible-tabs--content" aria-hidden="false"
    		     role="tabpanel">Lorem ipsum commodi.
    	     </div
        </div>
     </div>

## Note:

1. You having two separator symbols(⁞) in one block level element i.e.: ` <div class="constr--accessible-tabs"><div>Tab 1⁞Content. Tab 2⁞</div></div>`; it will get rendered link this: `...<a... Tab 1></a>...<div...> Content. Tab 2⁞</div ` (_The tab 2 text will get added as part of tab 1's content_).
2.
