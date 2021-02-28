# Homebrew Entry Format

```json
{
  "name": "Example Homebrew",
  "type": "example",
  "link": "https://example.com",
  "balance": 5,
  "notes": "Not real.",
  "changes": "Create something.",
  "tags": [ "roleplay", "tech" ]
}
```

**Name**. String. The title of the homebrew to be submitted. Capitalize according to title conventions.

**Gsheet**. Boolean. Whether this content has been added to Red's GSheet

**Type**. String. One of "spell", "feat", "class", "expansion", "race", "background", "familiar", "subclass"

**Supertype**. String. Optional. If this is a subrace or subclass, note what it is for.

**Level**. Integer. Optional. If this is a spell, indicate what level it is

**Link**. String. A link to the source of the homebrew. Ideally this should be a link that includes the author, such as an origianl post, and not just the author.

**Balance**. Integer (-5 to 5). A measure of balance, with negatives meaning underpowered and positives meaning overpowered. 5s refer to "campaign-breaking", such as planar travel and becoming a deity. 4s refer to "gamebreaking", such as no-roll instant kills. 3-1s refer to regular balance ratings.

**Notes**. String. Optional. An explanation for the balance rating or tags given, along with any other notes left by the DM.

**Changes**. String. Optional. The changes needed to be made to the document if it would be used. These are applied before any of the other fields are assessed.

**Tags**. List of Strings. Optional. Tags used to determine properties of the homebrew. Valid tags are "magic", "digital", (requires a concept of) "souls", "revival", "nonmechanical" (better as roleplay), "joke", and "external" (for content from other games and similar).
