# SKILSAW Garage Bench — Builder's Manual

## Sliding Carriage Table Saw Workstation

**Saw Model:** SKIL SPT99-11 Worm-Drive Contractor Saw
**Finished Size:** 90 in (L) x 48 in (D) x 36 in (H)
**Weight Capacity:** 1200+ lb (retractable casters)
**Document Version:** 1.0

---

> **How to use this manual:** Work through each section in order. The build
> has two HARD GATES — the Stripped-Saw Survey (Step 0) and the Real Saw
> Test-Fit (Step 7). Do NOT skip ahead past a gate. Each gate unlocks the
> precision machining that follows it.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Key Dimensions Quick Reference](#2-key-dimensions-quick-reference)
3. [Layout Diagrams](#3-layout-diagrams)
4. [Shopping List — Materials](#4-shopping-list--materials)
5. [Shopping List — Hardware & Components](#5-shopping-list--hardware--components)
6. [DO NOT BUY YET List](#6-do-not-buy-yet-list)
7. [Tools You Will Need](#7-tools-you-will-need)
8. [Master Cut List](#8-master-cut-list)
9. [Build Sequence Overview](#9-build-sequence-overview)
10. [Step 0: Stripped-Saw Survey (HARD GATE 1)](#10-step-0-stripped-saw-survey--hard-gate-1)
11. [Step 1: Build the Plinth](#11-step-1-build-the-plinth)
12. [Step 2: Build the Left Storage Module](#12-step-2-build-the-left-storage-module)
13. [Step 3: Build the Center Saw Chassis](#13-step-3-build-the-center-saw-chassis)
14. [Step 4: Build the Right Service Module](#14-step-4-build-the-right-service-module)
15. [Step 5: Join All Modules](#15-step-5-join-all-modules)
16. [Step 6: Dry-Fit the L-Shaped Fixed Top](#16-step-6-dry-fit-the-l-shaped-fixed-top)
17. [Step 7: Fit the Saw (HARD GATE 2)](#17-step-7-fit-the-saw--hard-gate-2)
18. [Step 8: Build & Register the Front Wing](#18-step-8-build--register-the-front-wing)
19. [Step 9: Machine the Fixed Top & Wing](#19-step-9-machine-the-fixed-top--wing)
20. [Step 10: Router Module](#20-step-10-router-module)
21. [Step 11: Dust & Power](#21-step-11-dust--power)
22. [Step 12: Storage & Panels](#22-step-12-storage--panels)
23. [Step 13: Finishing](#23-step-13-finishing)
24. [Validation Checklists](#24-validation-checklists)
25. [Post-Build Functional Tests](#25-post-build-functional-tests)
26. [Appendix A: Stripped-Saw Survey Fill-In Worksheet](#appendix-a-stripped-saw-survey-fill-in-worksheet)
27. [Appendix B: Surface Finish Classes](#appendix-b-surface-finish-classes)
28. [Appendix C: Dust & Power Wiring Reference](#appendix-c-dust--power-wiring-reference)
29. [Appendix D: Assembly-Mode & T-Track Reference](#appendix-d-assembly-mode--t-track-reference)

---

## 1. Project Overview

This bench integrates a SKIL SPT99-11 worm-drive table saw into a full-size
garage workstation. It does five jobs:

1. **Primary table saw** with real infeed, outfeed, and side support
2. **Crosscut station** with continuous miter slots through wing, saw, and rear support
3. **Router table** with flush-mount JessEm lift and removable fence
4. **Dust collection** with internal Hercules extractor and Oneida separator
5. **Assembly surface** with T-tracks and a future removable overlay

The bench parks against a 90 in wall with the long side flush. It rolls
straight out for use — no rotation required.

### What Makes This Build Different

- The saw is removed from its rolling stand and dropped into the bench
- The top is L-shaped, NOT a single 90 x 48 slab
- A fold-down front wing provides infeed support for crosscuts
- Miter slots are continuous across wing, saw top, and rear support
- Two hard gates prevent you from making precision cuts before the real
  saw geometry is measured

---

## 2. Key Dimensions Quick Reference

### Overall Bench

| Dimension          | Value     |
|--------------------|-----------|
| Length             | 90 in     |
| Depth              | 48 in     |
| Height (finished)  | 36 in     |
| Top thickness      | 1.5 in (3/4 ply + 3/4 MDF) |
| Top overhang L/R   | 1.5 in each |
| Top overhang F/R   | 3.0 in each |

### Plinth

| Dimension | Value           |
|-----------|-----------------|
| Length    | 84 in           |
| Depth     | 39 in           |
| Height    | 3.5 in          |
| Material  | 2x6 perimeter + 2x4 internals |

### Carcass (all three modules combined)

| Dimension | Value  |
|-----------|--------|
| Length    | 87 in  |
| Depth     | 42 in  |
| Height    | 31 in  |

### Individual Modules

| Module           | Length   | Depth  | Height |
|------------------|----------|--------|--------|
| Left Storage     | 27.75 in | 42 in  | 31 in  |
| Center Saw       | 30.5 in  | 42 in  | 31 in  |
| Right Service    | 28.75 in | 42 in  | 31 in  |

### Saw Placement

| Dimension                  | Value         | Status     |
|----------------------------|---------------|------------|
| Blade center from left     | 36 in         | LOCKED     |
| Blade center from front    | 27.3125 in    | PROVISIONAL|
| Cast top size              | 27.5625 x 22.125 in | Confirmed |
| Mount plane from floor     | 22.625 in     | Confirmed  |
| Saw body height            | 13.375 in     | Confirmed  |

### Fixed Top Regions

| Region              | Length    | Depth     |
|----------------------|----------|-----------|
| Rear main panel     | 90 in    | 31.75 in  |
| Right-front infill  | 30.25 in | 16.25 in  |

### Front Wing (fold-down)

| Dimension | Value     |
|-----------|-----------|
| Length    | 59.75 in  |
| Depth     | 16.25 in  |
| Thickness | 1.5 in (ply + ply) |

### Miter Slot Centerlines

| Slot  | Center X from left edge |
|-------|------------------------|
| Left  | 29.625 in              |
| Right | 41.25 in               |

---

## 3. Layout Diagrams

### Top View (looking down)

```
                    90 in
    ◄──────────────────────────────────────────────────────►
    ┌──────────────────────────────────────────────────────┐ ▲
    │                                                      │ │
    │  FOLD-DOWN FRONT WING          │  RIGHT-FRONT INFILL │ │ 16.25 in
    │  59.75 x 16.25 in              │  30.25 x 16.25 in  │ │
    │  (plywood both faces)           │  (ply + MDF)        │ │
    │    ┆             ┆              │                     │ ▼
    ├────┆─────────────┆──────────────┼─────────────────────┤ ▲
    │    ┆             ┆              │                     │ │
    │    ┆  ┌──────────┆──────┐       │   ┌──────────────┐  │ │
    │  T ┆  │          ┆      │       │   │              │  │ │
    │  | ┆  │   SAW    ┆      │       │   │   ROUTER     │  │ │
    │  T ┆  │  CAST    ┆      │    ░░░│░░░│   MODULE     │  │ │
    │  r ┆  │  TOP     ┆      │   rail│   │   (JessEm    │  │ │
    │  a ┆  │ 27.56 x  ┆      │  keep │   │    lift)     │  │ │ 31.75 in
    │  c ┆  │ 22.13 in ┆      │ clear │   │              │  │ │
    │  k ┆  │          ┆      │  lanes│   │              │  │ │
    │  s ┆  │          ┆      │    ░░░│░░░│              │  │ │
    │    ┆  └──────────┆──────┘       │   └──────────────┘  │ │
    │    ┆             ┆              │                     │ │
    │    ┆             ┆     REAR MAIN PANEL                │ │
    │    ┆             ┆     90 x 31.75 in (ply + MDF)      │ │
    │    ┆             ┆              │                     │ ▼
    └──────────────────────────────────────────────────────┘

    ┆ = miter slot centerlines (left @ 29.625, right @ 41.25)
    ░ = rail keep-clear zones (2.25 in minimum clearance below)

    BLADE CENTER: 36 in from left edge  ───── ×
```

### Side Section (A-A, through blade centerline)

```
    ┌─────────────────────────────────────────┐  ◄── 36 in (finished top)
    │▓▓▓▓▓▓▓▓▓▓▓▓ TOP STACK ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  1.5 in (3/4 ply + 3/4 MDF)
    ├─────────────────────────────────────────┤
    │                                         │
    │                                         │
    │           CARCASS                       │  ◄── 22.625 in (saw mount plane)
    │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
    │                                         │
    │      Open saw well for hose and         │
    │      bevel motion clearance             │
    │                                         │
    │                                         │
    ├─────────────────────────────────────────┤
    │▒▒▒▒▒▒▒▒▒▒▒▒ PLINTH ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│  3.5 in
    ├─────────────────────────────────────────┤
    ▼ FLOOR                                     0 in
```

### Front Section (B-B, looking from operator position)

```
    ┌────────────────┬───────────────┬───────────────┐ ◄── 36 in
    │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓▓ TOP ▓▓▓▓▓▓▓│ 1.5 in
    ├────────────────┼───────────────┼───────────────┤
    │                │               │ ┌───────────┐ │
    │   LEFT         │   CENTER      │ │  ROUTER   │ │
    │   STORAGE      │   SAW         │ │  MODULE   │ │
    │                │   CHASSIS     │ └───────────┘ │
    │  ┌──────────┐  │               │ ┌───────────┐ │
    │  │ drawer 1 │  │   (open       │ │ Oneida    │ │
    │  ├──────────┤  │    frame)     │ │ Low-Pro   │ │
    │  │ drawer 2 │  │               │ │ bucket    │ │
    │  ├──────────┤  │   Saw sits    │ ├───────────┤ │
    │  │ drawer 3 │  │   on cradle   │ │ Hercules  │ │
    │  │          │  │   ledgers     │ │ HE028     │ │
    │  └──────────┘  │               │ │ extractor │ │
    │  ┌────┐        │               │ │ (on tray) │ │
    │  │vert│        │               │ │           │ │
    │  │bay │        │               │ └───────────┘ │
    ├──┴────┴────────┴───────────────┴───────────────┤
    │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ PLINTH ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ 3.5 in
    └────────────────────────────────────────────────┘
    ▼ FLOOR

    ◄── 27.75 ──►◄──── 30.5 ────►◄──── 28.75 ────►
         Left         Center           Right
```

---

## 4. Shopping List — Materials

Buy these before you start. All sheet goods are 4 ft x 8 ft standard sheets.

### Sheet Goods

| # | Material                   | Qty | Thickness | Use |
|---|----------------------------|-----|-----------|-----|
| 1 | Cabinet plywood (AC/BC or birch) | 8 sheets | 3/4 in | Structure, top substrate, wing, router module, service panels |
| 2 | MDF                        | 2 sheets | 3/4 in | Fixed-top precision skins, sample boards, setup waste margin |
| 3 | Prefinished plywood        | 2 sheets | 1/2 in | Drawer boxes, back panels, lighter service panels |

### Lumber

| # | Material                  | Qty | Size     | Use |
|---|---------------------------|-----|----------|-----|
| 4 | Kiln-dried construction lumber | 8 pcs | 2x4x8 | Plinth framing, saw ledgers, wing legs, blocking |
| 5 | Kiln-dried construction lumber | 2 pcs | 2x6x8 | Caster hardpoints, plinth reinforcement |
| 6 | Hardwood or UHMW (optional) | 2 pcs | 1x2 | Wear edging for high-abuse front edges |

### Finish Materials

| # | Material                    | Qty    | Use |
|---|-----------------------------|--------|-----|
| 7 | Satin waterborne polyurethane | 1 qt | Top, wing, router module |
| 8 | Dewaxed shellac sealer       | 1 qt | Seal MDF faces and edges |
| 9 | Sandpaper assortment (80, 120, 150, 180) | 1 set | Finishing prep |

---

## 5. Shopping List — Hardware & Components

### Mobility

| Item | Qty | Spec | Notes |
|------|-----|------|-------|
| Retractable caster kit | 1 set | Foot-operated, 1200+ lb total | Do NOT use light-duty 400-600 lb kits |
| Adjustable leveling feet | 4 ea | Heavy-duty 3/8-16 or 1/2-13 | Mount through plinth corners |

### Joinery Fasteners

| Item | Qty | Spec |
|------|-----|------|
| Pocket-hole screws | 1 box | 1-1/4 in coarse thread |
| Structural screws | 1 box (48+) | 3 in |
| Cabinet screws | 1 box (60+) | 1-1/4 in washer head |
| Wood glue | 1 bottle | Type II PVA |

### Wing Hardware

| Item | Qty | Spec |
|------|-----|------|
| Piano hinge | 1 ea | 72 in heavy-duty, cut-to-fit |
| Folding leg brackets | 2 ea | Locking table-leg type |
| Tapered alignment pins + bushings | 1 set (2 pins + 2 bushings) | Positive wing registration |
| Adjustable foot glides | 2 ea | Threaded, for wing legs |
| Pan-head screws No. 8 x 3/4 | 48 ea | Hinge and track installation |

### Drawer & Slide Hardware

| Item | Qty | Spec |
|------|-----|------|
| Drawer slides | 3 pairs | 22 in full extension |
| Slide screws No. 6 x 1/2 | 36 ea | Drawer slide installation |

### Track & Assembly Hardware

| Item | Qty | Spec |
|------|-----|------|
| T-track (low-profile aluminum) | 2 ea | 36 in | Assembly tracks in far-left field |
| Threaded inserts 1/4-20 | 4 ea | Future overlay anchor points |
| Star knobs 1/4-20 | 4 ea | Future overlay hold-downs |

### Dust Collection Components

| Item | Qty | Spec |
|------|-----|------|
| Hercules HE028 dust extractor | 1 ea | 12-gallon HEPA |
| Oneida Dust Deputy Low-Pro lid separator | 1 ea | For 5-gal bucket |
| Heavy-wall 5-gal bucket | 1 ea | Compatible with Low-Pro lid |
| Rockler 2-1/2 in manifold starter + 2 extensions | 1 set | 3-branch switching |
| Flexible hose 2-1/2 in | 12 ft | Antistatic preferred |
| Hose clamps 2-1/2 in | 10 ea | For dust plumbing |
| Heavy-duty tray slides | 1 pair | 24 in, 100+ lb rating (Hercules pull-out) |

### Power Components

| Item | Qty | Spec |
|------|-----|------|
| Flanged inlet | 1 ea | 15A or 20A weather-protected |
| Metal power strip | 1 ea | With overload protection |
| Tool pigtail | 1 ea | 12/3 SJTW, 8-12 ft |
| Cable grommets & strain reliefs | 1 set | Assorted |
| Paddle/guarded switch | 1 ea | Master aux shutoff |
| RF remote switch | 1 set | iVac or equivalent for extractor |

### Router Components

| Item | Qty | Spec |
|------|-----|------|
| JessEm Rout-R-Lift II 02310 | 1 ea | Router lift |
| Bosch 1617EVS motor | 1 ea | Router motor |
| Flat-head machine screws | 8 ea | Match JessEm plate pattern |

### Service Hardware

| Item | Qty | Spec |
|------|-----|------|
| Hatch latches or magnets | 2 ea | Router hatch + front service panel |
| Cable clamps & strain reliefs | 8 ea | Cord and hose management |

---

## 6. DO NOT BUY YET List

These items require field measurements before you can order the right size:

| Item | Wait for... |
|------|-------------|
| **Miter track** (2 ea, 48 in aluminum 3/4 x 3/8) | Verify actual saw miter-slot width and depth |
| **Saw mount bolts/hardware** | Complete stripped-saw survey to confirm mount pattern |
| **Router fence** (shop-built or commercial) | Confirm router plate fit first |

---

## 7. Tools You Will Need

### For the Stripped-Saw Survey
- [ ] Tape measure
- [ ] 6 in steel rule
- [ ] Combination square
- [ ] Digital calipers
- [ ] Straightedge (24 in minimum)
- [ ] Painter's tape
- [ ] Fine marker or sharp pencil
- [ ] Phone camera
- [ ] Two padded support rails or blocks
- [ ] Scrap wood shims

### For the Build
- [ ] Table saw or track saw (for sheet goods)
- [ ] Circular saw
- [ ] Drill/driver
- [ ] Impact driver
- [ ] Pocket-hole jig (if using pocket screws)
- [ ] Router with straight bit (for dados and recesses)
- [ ] Jigsaw (for saw opening cutout)
- [ ] Clamps: at least 6 bar clamps (36 in+), 4 spring clamps
- [ ] Speed square
- [ ] 4 ft level
- [ ] Framing square
- [ ] Chisel set
- [ ] Random orbit sander
- [ ] Block plane
- [ ] Utility knife
- [ ] Safety equipment: ear protection, eye protection, dust mask

---

## 8. Master Cut List

All dimensions are in inches. **Rough** = cut oversize for trimming to final.
Cut parts for each assembly as you reach that step — do NOT pre-cut everything.

### Plinth Parts

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| PL-01 | 2x6 | 1.5 | 2 | 84.5 | 5.5 | 84 | 5.5 | Front & rear plinth rails |
| PL-02 | 2x4 | 1.5 | 4 | 39.5 | 3.5 | 36 | 3.5 | Side rails & internal crossmembers |
| PL-03 | 2x6 | 1.5 | 4 | 8 | 5.5 | 7 | 5.5 | Caster hardpoint blocks |
| PL-04 | Plywood | 0.75 | 2 | 8 | 8 | 7 | 7 | Leveling-foot pads (if needed) |

### Left Module Parts

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| LM-01 | Plywood | 0.75 | 2 | 31.5 | 42.5 | 31 | 42 | Sides |
| LM-02 | Plywood | 0.75 | 1 | 31.5 | 42.5 | 31 | 42 | Internal partition |
| LM-03 | Plywood | 0.75 | 1 | 26 | 42.5 | 25.5 | 42 | Bottom deck |
| LM-04 | Plywood | 0.75 | 2 | 26 | 4.5 | 25.5 | 4 | Top stretchers (front & rear) |
| LM-05 | Plywood | 0.5 | 1 | 28.25 | 31.5 | 27.75 | 31 | Back panel |
| LM-06 | Plywood | 0.75 | 2 | 8.5 | 41 | 8 | 40.5 | Vertical-bay shelves |

### Center Saw Module Parts

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| CM-01 | Plywood | 0.75 | 2 | 31.5 | 42.5 | 31 | 42 | Sides |
| CM-02 | Plywood | 0.75 | 2 | 29.5 | 4.5 | 29 | 4 | Top stretchers (front & rear) |
| CM-03 | Plywood | 0.75 | 2 | 29.5 | 6.5 | 29 | 6 | Lower stretchers (front & rear) |
| CM-04 | 2x4 | 1.5 | 2 | 29.5 | 3.5 | 29 | 3.5 | Saw-mount ledgers |
| CM-05 | 2x4 | 1.5 | 2 | 24.5 | 3.5 | 24 | 3.5 | Saw cradle crossrails (FIELD-FIT ONLY) |

### Right Service Module Parts

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| RM-01 | Plywood | 0.75 | 2 | 31.5 | 42.5 | 31 | 42 | Sides |
| RM-02 | Plywood | 0.75 | 1 | 31.5 | 42.5 | 31 | 42 | Notched partition (clear rail lanes!) |
| RM-03 | Plywood | 0.75 | 1 | 21 | 41 | 20.5 | 40.5 | Dust-bay floor |
| RM-04 | Plywood | 0.75 | 2 | 27 | 4.5 | 26.5 | 4 | Top stretchers (front & rear) |
| RM-05 | Plywood | 0.5 | 1 | 29.25 | 31.5 | 28.75 | 31 | Back panel (with service cutouts) |
| RM-06 | Plywood | 0.75 | 1 | 20.5 | 28.5 | 20 | 28 | Front lower service face |
| RM-07 | Plywood | 0.75 | 1 | 12.5 | 10.5 | 12 | 10 | Router access hatch |
| RM-08 | Plywood | 0.75 | 1 | 24.5 | 19.5 | 24 | 19 | Hercules pull-out tray (FIELD-FIT) |

### Top Assembly Parts

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| TOP-01A | Plywood | 0.75 | 1 | 90.5 | 32.25 | 90 | 31.75 | Rear fixed-top substrate |
| TOP-01B | Plywood | 0.75 | 1 | 30.75 | 16.75 | 30.25 | 16.25 | Right-front infill substrate |
| TOP-02A | MDF | 0.75 | 1 | 90.5 | 32.25 | 90 | 31.75 | Rear fixed-top precision skin |
| TOP-02B | MDF | 0.75 | 1 | 30.75 | 16.75 | 30.25 | 16.25 | Right-front infill precision skin |
| TOP-03 | Plywood | 0.75 | 4 | 15 | 2.5 | 14 | 2 | Router plate ledgers & blocking |
| TOP-04 | Plywood | 0.75 | 2 | 30.75 | 4.5 | 30.25 | 4 | Seam cleats under infill joint |
| TOP-05 | Plywood | 0.75 | 2 | 42 | 3.5 | 41.25 | 3 | Under-top stiffeners (outside rail lanes!) |
| TOP-06 | Plywood | 0.75 | 4 | 4.5 | 4.5 | 4 | 4 | Future overlay anchor pads |

### Front Wing Parts

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| FW-01 | Plywood | 0.75 | 1 | 60.25 | 16.75 | 59.75 | 16.25 | Wing substrate |
| FW-02 | Plywood | 0.75 | 1 | 60.25 | 16.75 | 59.75 | 16.25 | Wing skin |
| FW-03 | Plywood | 0.75 | 1 | 60.25 | 3.5 | 59.75 | 3 | Wing stiffener batten |
| FW-04 | 2x4 | 1.5 | 2 | 37 | 1.75 | 35.5 | 1.5 | Folding leg blanks (trim after hinge fit) |
| FW-05 | Plywood | 0.75 | 2 | 12 | 3.5 | 11.5 | 3 | Folding leg feet/cleats |
| FW-06 | Plywood | 0.75 | 2 | 4.5 | 4.5 | 4 | 4 | Registration-pin backing blocks |

### Drawer Parts (3 drawers)

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| DR-01 | Plywood | 0.5 | 6 | 22.5 | 4.5 | 22 | 4 | Top drawer sides (2 drawers) |
| DR-02 | Plywood | 0.5 | 6 | 16.5 | 4.5 | 16 | 4 | Top drawer fronts & backs |
| DR-03 | Plywood | 0.5 | 2 | 22.5 | 6.5 | 22 | 6 | Middle drawer sides |
| DR-04 | Plywood | 0.5 | 2 | 16.5 | 6.5 | 16 | 6 | Middle drawer front & back |
| DR-05 | Plywood | 0.5 | 2 | 22.5 | 8.5 | 22 | 8 | Bottom drawer sides |
| DR-06 | Plywood | 0.5 | 2 | 16.5 | 8.5 | 16 | 8 | Bottom drawer front & back |
| DR-07 | Plywood | 0.5 | 3 | 17 | 22.5 | 16.5 | 22 | Drawer bottoms |

### Router Fence Parts

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| RF-01 | Plywood | 0.75 | 1 | 33 | 6.5 | 32 | 6 | Fence body |
| RF-02 | Plywood | 0.75 | 2 | 16 | 4.5 | 15.5 | 4 | Fence faces |
| RF-03 | Plywood | 0.75 | 2 | 12 | 5.5 | 11.5 | 5 | Fence ends |

### Future Assembly Overlay Parts (Stage 2 — build later)

| Part | Material | Thick | Qty | Rough L | Rough W | Final L | Final W | Notes |
|------|----------|-------|-----|---------|---------|---------|---------|-------|
| ASM-01 | Plywood | 0.75 | 1 | 60.5 | 36.5 | 60 | 36 | Overlay panel |
| ASM-02 | Plywood | 0.75 | 1 | 36.5 | 1.75 | 36 | 1.5 | Left register cleat |
| ASM-03 | Plywood | 0.75 | 1 | 60.5 | 1.75 | 60 | 1.5 | Rear register cleat |
| ASM-04 | Plywood | 0.75 | 1 | 30.5 | 2.5 | 30 | 2 | Underside stiffener over saw opening |

**Total parts: 52**

---

## 9. Build Sequence Overview

```
  ┌─────────────────────────────────────┐
  │  STEP 0: STRIPPED-SAW SURVEY        │◄── HARD GATE 1
  │  (Must complete before machining)   │    No precision cuts until this passes
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │  STEP 1: Build Plinth              │
  │  STEP 2: Build Left Module         │
  │  STEP 3: Build Center Module       │    Can build in parallel
  │  STEP 4: Build Right Module        │
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │  STEP 5: Join All Modules          │
  │  STEP 6: Dry-Fit Fixed Top         │
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │  STEP 7: FIT THE SAW               │◄── HARD GATE 2
  │  (Verify real geometry)             │    No machining until this passes
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │  STEP 8: Build & Register Wing     │
  │  STEP 9: Machine Top & Wing        │
  │  STEP 10: Install Router Module    │
  │  STEP 11: Install Dust & Power     │
  │  STEP 12: Storage & Panels         │
  │  STEP 13: Finish                   │
  └─────────────────────────────────────┘
```

---

## 10. Step 0: Stripped-Saw Survey — HARD GATE 1

**This step is mandatory. Do not machine the top, drill the cradle, or buy
miter track until every measurement below is recorded.**

### Purpose

This survey closes the precision-cut gate. Until it is done, the build
package is only concept-accurate in the saw's front-to-back (Y) direction.

### Setup

**Unplug the saw.** Remove the fence, miter gauge, blade guard/riving
components, and throat plate.

You need two setups:

**Setup A — Saw Upright** (on a stable temporary platform, cast top level):
- Blade center Y measurement
- Miter-slot width and depth
- Rail sweep at min/mid/max rip
- Dust hose sweep at 0 and 45 degrees

**Setup B — Saw Inverted** (upside down on padded blocks supporting the cast
top — NOT resting on knobs or handwheels):
- Foot center locations
- Foot-pad size and mount-hole diameter
- Lowest underside protrusion
- Dust-port center location

### Datum System

All measurements use the same coordinate system:

```
    ▲ Y (toward rear)
    │
    │        CAST TOP
    │   ┌──────────────────┐
    │   │                  │
    │   │    SAW            │
    │   │                  │
    │   │                  │
    │   └──────────────────┘
    ●───────────────────────► X (toward right)
  FRONT-LEFT
  CORNER
```

- **X** = from the left cast-top edge toward the right
- **Y** = from the front cast-top edge toward the rear
- **Z** = downward below the saw mount plane
- **Front** = operator side
- **Mount plane** = plane touching the bottoms of the four saw feet

Mark the front and left cast-top edges with painter's tape before measuring.

### Pre-Survey Checklist

- [ ] Saw unplugged
- [ ] Fence removed
- [ ] Miter gauge removed
- [ ] Blade guard/riving components removed (if they interfere)
- [ ] Throat plate removed (if it helps sight the blade center)
- [ ] Photos taken of saw before teardown
- [ ] Front and left datum edges marked with tape

### Measurement Procedures

#### 1. Blade Center Y (Setup A)

1. Set blade to 90 degrees
2. Raise blade enough to measure a tooth cleanly
3. Pick one tooth and mark it
4. Rotate that tooth to the **front** of the blade arc — measure from front
   cast-top edge to tooth tip
5. Rotate same tooth to the **rear** — measure again from front edge to tip
6. **Average the two readings** = `stripped_blade_center_y`

#### 2. Miter Slot Width & Depth (Setup A)

1. Measure each slot with calipers at front, middle, and rear
2. Record the tightest honest width
3. Measure depth with caliper depth rod from cast-top surface to slot bottom
4. **If left and right slots differ, STOP and record both** before buying track

#### 3. Foot Centers & Pad Size (Setup B)

For each of the four feet (front-left, front-right, rear-left, rear-right):
1. Measure to the center of the mounting hole from the left and front cast-top edges
2. Measure the actual support pad footprint (not just hole center)
3. Measure hole diameter with calipers
4. **Take one photo per foot with a ruler visible**

#### 4. Lowest Underside Protrusion (Setup B)

1. Bridge a straightedge across two foot pads (defining the mount plane)
2. Measure from that plane down to the lowest non-foot feature
3. Include anything that could hit a stretcher, block wrench access, or foul
   the dust well

#### 5. Rail Sweep at Min/Mid/Max Rip (Setup A)

For each of 3 rip positions (min, mid, max) and each of 2 rails (front, rear):
1. Find the furthest-right hard point under the top
2. Measure how far it extends past the cast-top right edge
3. **Take photos of min, mid, and max positions**

#### 6. Dust-Port Center (Setup B)

1. Identify the center of the saw's dust port
2. Measure from left and front cast-top edges
3. Record port diameter if it differs from the assumed 2.5 in

#### 7. Hose Sweep (Setup A)

1. Attach actual hose/elbow (or closest stand-in)
2. Set blade to 0 degrees, cycle through full height range
3. Measure maximum rearward projection behind the rear cast-top edge
4. Repeat at 45-degree bevel
5. **Take photos at worst-case positions**

### Recording Your Measurements

Use the fill-in worksheet in **Appendix A** to record all values, then
transfer them to `data/measurements.csv`.

### Survey Completion Checklist

- [ ] All 24 survey values recorded in worksheet
- [ ] Values transferred to `data/measurements.csv`
- [ ] Survey photos saved
- [ ] Validation passes: `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv`
- [ ] Layout validation passes: `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv`
- [ ] **GATE 1 IS NOW OPEN** — proceed to building

---

## 11. Step 1: Build the Plinth

**Target size: 84 x 39 x 3.5 in**

### Parts Needed

| Part | Qty | Description |
|------|-----|-------------|
| PL-01 | 2 | 2x6 front & rear rails (84 in) |
| PL-02 | 4 | 2x4 side rails & crossmembers (36 in) |
| PL-03 | 4 | 2x6 caster hardpoint blocks (7 in) |
| PL-04 | 2 | Plywood leveling-foot pads (7 x 7 in, if needed) |

### Hardware Needed

- 48 ea 3 in structural screws
- Wood glue
- Retractable caster kit
- 4 adjustable leveling feet

### Instructions

1. Cut the 2x6 front and rear rails to 84 in
2. Cut the 2x4 side rails to 36 in (they fit between the front/rear rails)
3. Cut 2 additional 2x4 internal crossmembers to 36 in
4. Dry-fit the rectangle: 2x6 rails on the long sides, 2x4 on the short sides
5. **Check for square** by measuring diagonals — they must match within 1/8 in
6. Glue and screw the perimeter frame
7. Install the 2 internal crossmembers equally spaced
8. Glue the 4 caster hardpoint blocks at the caster locations per your caster kit
9. Drill and install the 4 adjustable leveling feet near the corners
10. Install the retractable caster system per its instructions

### Completion Checklist

- [ ] Plinth is flat and square (diagonal check)
- [ ] All joints glued and screwed
- [ ] Caster hardpoints installed
- [ ] Leveling feet installed
- [ ] Casters installed and retract smoothly
- [ ] Set plinth in parked location — verify it rolls out cleanly

---

## 12. Step 2: Build the Left Storage Module

**Target size: 27.75 x 42 x 31 in**

### Parts Needed

| Part | Qty | Description |
|------|-----|-------------|
| LM-01 | 2 | Sides (31 x 42 in) |
| LM-02 | 1 | Internal partition (31 x 42 in) |
| LM-03 | 1 | Bottom deck (25.5 x 42 in) |
| LM-04 | 2 | Top stretchers (25.5 x 4 in) |
| LM-05 | 1 | Back panel, 1/2 in (27.75 x 31 in) |
| LM-06 | 2 | Vertical-bay shelves (8 x 40.5 in) |

### Hardware Needed

- Cabinet screws (1-1/4 in washer head)
- Pocket-hole screws (if using pocket joinery)
- Wood glue
- 3 pairs drawer slides (22 in full extension) — install now, build drawers later

### Instructions

1. Cut the two sides and the partition
2. Cut the bottom deck
3. Assemble: sides standing upright, bottom deck between them
4. Position the partition to create a wider drawer section and a narrow
   vertical storage bay (for fences, jigs, tracks)
5. Install front and rear top stretchers flush with the top edge
6. Install the 3 pairs of drawer slides on the drawer-bank side
7. Install vertical-bay shelves if desired
8. **Check for square** — the back panel is your reference
9. Install the back panel LAST, after confirming the module is square

### Completion Checklist

- [ ] Module is square (check diagonals)
- [ ] All joints secure
- [ ] Drawer slides installed (3 pairs)
- [ ] Back panel installed
- [ ] Module top edges are flush and level

---

## 13. Step 3: Build the Center Saw Chassis

**Target size: 30.5 x 42 x 31 in**

This is an **open-frame module**, not a full enclosed cabinet. The saw
body needs room for dust hose routing, blade-tilt motion, and wrench access.

### Parts Needed

| Part | Qty | Description |
|------|-----|-------------|
| CM-01 | 2 | Sides (31 x 42 in) |
| CM-02 | 2 | Top stretchers (29 x 4 in) |
| CM-03 | 2 | Lower stretchers (29 x 6 in) |
| CM-04 | 2 | Saw-mount ledgers, 2x4 (29 x 3.5 in) |
| CM-05 | 2 | Saw cradle crossrails, 2x4 (24 x 3.5 in) — FIELD-FIT ONLY |

### Instructions

1. Cut the two sides
2. Cut and install top front and rear stretchers flush with the top edge
3. Cut and install lower front and rear stretchers — **keep them LOW** so
   the dust hose and blade-tilt motion are not trapped
4. Install saw-mount ledgers at a nominal **22.625 in** from the floor
   (this is the mount-plane height)
5. **Leave the cradle crossrails (CM-05) loose** — do NOT permanently attach
   them until the real saw is physically test-fit in Step 7

### Completion Checklist

- [ ] Module is square
- [ ] Top stretchers flush with top edge
- [ ] Lower stretchers leave clearance for dust hose and tilt
- [ ] Mount ledgers at correct height (22.625 in from floor)
- [ ] Crossrails are loose / dry-fit only

---

## 14. Step 4: Build the Right Service Module

**Target size: 28.75 x 42 x 31 in**

This module houses the router (above) and the entire dust package (below).

### Parts Needed

| Part | Qty | Description |
|------|-----|-------------|
| RM-01 | 2 | Sides (31 x 42 in) |
| RM-02 | 1 | Notched partition (31 x 42 in) |
| RM-03 | 1 | Dust-bay floor (20.5 x 40.5 in) |
| RM-04 | 2 | Top stretchers (26.5 x 4 in) |
| RM-05 | 1 | Back panel, 1/2 in (28.75 x 31 in) |
| RM-06 | 1 | Front lower service face (20 x 28 in) |
| RM-07 | 1 | Router access hatch (12 x 10 in) |
| RM-08 | 1 | Hercules pull-out tray (24 x 19 in) — FIELD-FIT |

### Critical Warning: Rail Keep-Clear Lanes

The internal partition (RM-02) **must be notched** so that no part of it
intrudes into the front or rear rail keep-clear zones. The saw's
rack-and-pinion rails travel through the underside of the right-side top
field. Any obstruction here will prevent the fence from extending fully.

```
    Partition RM-02 (front view)
    ┌───────────────────────────────┐
    │                               │
    │  NOTCH         NOTCH          │
    │  HERE ─►┌─┐   ┌─┐◄─ HERE     │
    │         │ │   │ │             │  Rail keep-clear zones
    │         └─┘   └─┘             │  (2.25 in min clearance)
    │                               │
    │                               │
    └───────────────────────────────┘
```

### Instructions

1. Cut the two sides
2. Cut the partition and **notch it** for the two rail keep-clear lanes
3. Install the dust-bay floor
4. Install front and rear top stretchers
5. Install the heavy-duty tray slides (24 in, 100+ lb rating) for the
   Hercules pull-out tray
6. Cut the router access hatch opening in the right end panel (12 x 10 in,
   bottom at 15 in from floor) — leave latch hardware for later
7. Cut the front lower service face — size it to clear the Hercules tray path
8. Keep the front-right face accessible for the manifold, aux shutoff, and
   flex-hose exit
9. Install the back panel with service cutouts

### Completion Checklist

- [ ] Module is square
- [ ] Partition notches clear the rail lanes
- [ ] Tray slides installed for Hercules
- [ ] Router hatch opening cut (12 x 10 in)
- [ ] Front service face fits but is removable
- [ ] No obstructions in rail keep-clear zones

---

## 15. Step 5: Join All Modules

### Instructions

1. Set all three modules on the plinth
2. Arrange left-to-right: Left Storage | Center Saw | Right Service
3. Clamp modules flush at the top edges
4. **Verify the overall carcass measures 87 x 42 x 31 in**
5. Screw modules together through the doubled side walls using 1-1/4 in
   washer-head screws (about 60 total)
6. Confirm the entire assembly is square before proceeding

### Completion Checklist

- [ ] All three modules on the plinth
- [ ] Top edges flush across all modules
- [ ] Overall size: 87 x 42 x 31 in
- [ ] Assembly is square (diagonal check across the top)
- [ ] Modules securely fastened to each other

---

## 16. Step 6: Dry-Fit the L-Shaped Fixed Top

**The top is NOT a single 90 x 48 slab.** It is two separate regions per layer:

```
    ┌─────────────────────────────────────────────────────┐
    │                                    │                │
    │         (wing opening)             │  RIGHT-FRONT   │
    │         front-left zone            │  INFILL        │
    │         stays empty for wing       │  30.25 x 16.25 │
    │                                    │                │
    ├────────────────────────────────────┼────────────────┤
    │                                                     │
    │           REAR MAIN PANEL                           │
    │           90 x 31.75 in                             │
    │                                                     │
    └─────────────────────────────────────────────────────┘
```

### Parts Needed

| Part | Qty | Description |
|------|-----|-------------|
| TOP-01A | 1 | Rear fixed-top substrate (90 x 31.75 in) |
| TOP-01B | 1 | Right-front infill substrate (30.25 x 16.25 in) |
| TOP-02A | 1 | Rear fixed-top MDF skin (90 x 31.75 in) |
| TOP-02B | 1 | Right-front infill MDF skin (30.25 x 16.25 in) |
| TOP-04 | 2 | Seam cleats (30.25 x 4 in) |
| TOP-05 | 2 | Under-top stiffeners (41.25 x 3 in) |
| TOP-06 | 4 | Future overlay anchor pads (4 x 4 in) |

### Instructions — DRY-FIT ONLY, DO NOT GLUE OR MACHINE YET

1. Cut the plywood substrate pieces **oversize** (use rough dimensions)
2. Cut the MDF skin pieces **oversize**
3. Dry-lay both fixed regions on the carcass
4. Verify the front-left wing opening remains clear (59.75 x 16.25 in)
5. Install seam cleats (TOP-04) under the right-front infill joint
6. Confirm the seam lands on real support
7. Position the under-top stiffeners (TOP-05) — they must stay **outside**
   the rail keep-clear lanes
8. Position the overlay anchor pads (TOP-06) at the four anchor locations

### Completion Checklist

- [ ] Both fixed top regions fit correctly
- [ ] Wing opening is clear (59.75 x 16.25 in)
- [ ] Seam cleats support the infill joint
- [ ] Stiffeners clear of rail lanes
- [ ] **Nothing is glued or machined yet**

---

## 17. Step 7: Fit the Saw — HARD GATE 2

**This is the second mandatory gate. Do not machine anything until every
check below passes.**

### Instructions

1. Set the SKIL SPT99-11 on the cradle with the fixed-top pieces still
   unmachined and sitting on top
2. Adjust mount points until the saw top is **exactly flush** with the
   surrounding fixed top (a few thousandths below is OK — never above)
3. Confirm the real stripped-saw `blade_center_y` matches the provisional
   layout (27.3125 in from front edge)
4. Confirm the actual opening size needed
5. Confirm the actual rail sweep at all rip positions
6. Confirm the dust-port location and hose sweep

### If Reality Disagrees with the Concept

If the real saw geometry does not match the layout, **update the design files
before machining:**

- Update `data/measurements.csv` with real values
- Update `data/layout.json` if positions change
- Re-run: `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv`

### Completion Checklist

- [ ] Saw physically sitting on the cradle
- [ ] Saw top flush or slightly below the fixed top
- [ ] Real blade Y datum confirmed vs. provisional layout
- [ ] Actual opening size confirmed
- [ ] Actual rail sweep confirmed at min/mid/max
- [ ] Dust-port and hose sweep confirmed
- [ ] Layout files updated (if needed)
- [ ] Validation scripts pass
- [ ] **GATE 2 IS NOW OPEN** — proceed to machining

---

## 18. Step 8: Build & Register the Front Wing

**Target size: 59.75 x 16.25 x 1.5 in**

### Parts Needed

| Part | Qty | Description |
|------|-----|-------------|
| FW-01 | 1 | Wing substrate (59.75 x 16.25 in) |
| FW-02 | 1 | Wing skin (59.75 x 16.25 in) |
| FW-03 | 1 | Wing stiffener batten (59.75 x 3 in) |
| FW-04 | 2 | Folding leg blanks (trim after hinge fit) |
| FW-05 | 2 | Folding leg feet/cleats |
| FW-06 | 2 | Registration-pin backing blocks |

### Hardware Needed

- 72 in piano hinge (cut to fit)
- 2 folding leg brackets (locking)
- 2 tapered alignment pins + 2 matching bushings
- 2 adjustable foot glides
- Pan-head screws No. 8 x 3/4

### Instructions

1. Laminate FW-01 and FW-02 together with glue for a 1.5 in thick wing
   (plywood both faces — NOT MDF, which is too fragile for a garage hinge edge)
2. Glue the stiffener batten (FW-03) to the underside
3. **Hinge the wing to the front edge of the LEFT and CENTER modules only**
   (the right-front infill stays fixed — do not hinge across it)
4. Install the 2 locking folding leg brackets
5. Install the 2 tapered alignment pins in the wing and matching bushings
   in the carcass
6. Trim the leg blanks (FW-04) and install the foot glides — set final
   height only after the hinge and registration hardware are locked
7. **Test: deploy and stow the wing 5+ times.** It must come up flush and
   repeatable before any slot routing.

### Completion Checklist

- [ ] Wing laminated to 1.5 in thickness
- [ ] Hinged only to left + center modules
- [ ] Folding legs installed and lock securely
- [ ] Alignment pins installed — wing repeats flush alignment
- [ ] Leg glides adjusted for solid floor contact
- [ ] Wing tested for repeatable flush alignment (5+ cycles)

---

## 19. Step 9: Machine the Fixed Top & Wing

**Only proceed after Steps 0, 7, and 8 are ALL complete.**

### Machining Order (follow this sequence exactly)

1. **Saw opening perimeter** — cut the opening in the fixed top for the
   saw body based on your actual measured geometry. Use 1/8 in gap all around.

2. **Router lift recess and cut-through** — machine from the MDF face first,
   then cut through both layers. The recess depth = plate thickness (0.375 in).
   Opening = 9.25 x 11.75 in for the JessEm plate.

3. **Assembly T-track dados** — route two dados in the far-left field:
   - Track 1 centerline: 8 in from left edge
   - Track 2 centerline: 20 in from left edge
   - Track run: from Y=6 in to Y=42 in

4. **Miter-track recesses** — route in the rear support first, then in the
   registered front wing. Both miter slot centerlines (left @ 29.625 in,
   right @ 41.25 in) must be continuous through wing, saw, and rear support.

5. **Underside reliefs** — cut any reliefs needed for the right-side rail
   keep-clear lanes (2.25 in minimum clearance below the top surface)

### Now Laminate the Top

After all machining is complete:
1. Glue the MDF skins to the plywood substrates
2. Use cauls and clamps for flat, even pressure
3. Trim any overhanging edges flush

### Completion Checklist

- [ ] Saw opening cut to actual measured size
- [ ] Router recess machined (0.375 in deep, 9.25 x 11.75 in)
- [ ] T-track dados routed (2 tracks in far-left field)
- [ ] Miter-track recesses routed (continuous through wing and rear support)
- [ ] Underside rail reliefs cut
- [ ] MDF skins laminated to substrates
- [ ] Miter gauge slides through all transitions without catching

---

## 20. Step 10: Router Module

### Parts Needed

| Part | Qty | Description |
|------|-----|-------------|
| TOP-03 | 4 | Router plate ledgers & blocking |
| RF-01 | 1 | Fence body |
| RF-02 | 2 | Fence faces |
| RF-03 | 2 | Fence ends |

### Hardware

- JessEm Rout-R-Lift II 02310
- Bosch 1617EVS motor
- 8 flat-head machine screws (match JessEm pattern)

### Instructions

1. Install the plate ledgers (TOP-03) around the router opening
2. Install the JessEm leveling hardware per the lift's instructions
3. Set the lift plate into the recess — it must sit **perfectly flush** with
   the surrounding MDF surface, no rocking
4. Verify you can reach the Bosch collet through the right-side access hatch
   (RM-07)
5. Build the removable fence:
   - Fence body (RF-01) with independent faces (RF-02) and ends (RF-03)
   - Include a rear dust port on the fence
   - The fence must mount and remove **without damaging the top**

### Completion Checklist

- [ ] Lift plate sits flush — no rocking
- [ ] Collet accessible through the right-side hatch
- [ ] Fence mounts repeatably
- [ ] Fence removes cleanly
- [ ] Dust pickup on fence does not block adjustment

---

## 21. Step 11: Dust & Power

### Dust System Layout

```
    TOOL OUTPUTS                    SEPARATOR               EXTRACTOR
    ┌─────────┐                  ┌──────────┐           ┌──────────┐
    │   Saw   ├─┐               │  Oneida  │           │ Hercules │
    ├─────────┤ │  ┌─────────┐  │  Low-Pro │           │  HE028   │
    │  Router ├─┼──┤ Rockler ├──┤  on 5gal ├───────────┤          │
    ├─────────┤ │  │Manifold │  │  bucket  │           │ (on pull │
    │  Flex   ├─┘  └─────────┘  └──────────┘           │ out tray)│
    │  hose   │                                        └──────────┘
    └─────────┘
              ◄─ shortest ──► ◄─── short ───► ◄──── short ────►
                 hoses            path             path

    Plumbing order: Tools → Manifold → Low-Pro inlet → Hercules vacuum port
```

### Dust Installation Sequence

1. Set the Oneida Low-Pro bucket at the **front** of the dust bay (on a fixed pad)
2. Install the Low-Pro lid on the 5-gallon bucket
3. Verify the short separator-to-extractor hose path
4. Set the Hercules HE028 **behind** the bucket on the pull-out tray
5. Mount the Rockler manifold in the front-right service zone
6. Connect hoses in this order:
   - Manifold outlet → Low-Pro inlet
   - Low-Pro outlet → Hercules vacuum port
7. Run the shortest possible hose paths using smooth-radius bends (no crushed loops)
8. Secure all connections with hose clamps

### Saw Dust Branch

- Use a dedicated short hose from the manifold to the saw port
- Verify full blade-height travel with hose installed
- Verify full bevel travel with hose installed
- Do not trap hose against fixed stretchers

### Router Dust Branch

- Split locally inside the router cavity:
  - One pickup at the fence
  - One pickup in the router cabinet
- Use a local Y-fitting, not another main manifold port

### Flex-Hose Branch

- Store the mobile-tool hose in the front-right service zone
- Route it so it exits the front-right corner without pinching when parked

### Power Installation

#### Tool Circuit (Saw or Router — never both at once)

- Route the dedicated tool pigtail (12/3 SJTW, 8-12 ft) from the bench to
  the wall outlet
- Dock the pigtail at the front-left underside of the center module
- This circuit does NOT go through the internal power strip

#### Aux Circuit (Dust extractor + accessories)

- Install the flanged inlet on the right side of the right module, toward front
- Install the metal power strip on the front-right interior wall
- Connect: inlet → strip → extractor, task light, chargers
- Install the master aux shutoff switch on the front-right face

#### Extractor Control

- Install the RF remote switch (iVac or equivalent) in the right service bay
- Do NOT bury it behind the extractor
- This is required because split circuits disable current-sensing auto-start

### Completion Checklist

- [ ] Oneida Low-Pro bucket positioned and hosed
- [ ] Hercules on pull-out tray, hose connected
- [ ] Manifold installed with all 3 branches connected
- [ ] Saw hose clears blade-height and bevel travel
- [ ] Router branch has fence + cabinet pickups
- [ ] Flex hose exits front-right without pinching
- [ ] Tool pigtail routed separately from aux
- [ ] Aux inlet, strip, and shutoff installed
- [ ] RF remote installed and tested
- [ ] Hercules can be removed through front tray without disassembly
- [ ] Cyclone bucket can be emptied without removing manifold

---

## 22. Step 12: Storage & Panels

### Drawer Construction

Build 3 drawer boxes to suit the installed slide hardware.

| Drawer | Side Height | Notes |
|--------|-------------|-------|
| Top (x2) | 4 in | Small parts — router bits, layout tools |
| Middle | 6 in | Medium accessories |
| Bottom | 8 in | Larger items |

Drawer box dimensions from cut list: sides = 22 in long, fronts/backs = 16 in,
bottoms = 16.5 x 22 in.

### Service Panels & Hatches

- Fit the front service panel after the dust system is tested
- Install the router hatch with latches or magnets
- Install any hose covers
- **Leave the saw-well service faces removable** — you will need to access
  the saw mount hardware for adjustments

### Completion Checklist

- [ ] 3 drawers built and installed
- [ ] Drawers slide smoothly on all 3 pairs of slides
- [ ] Front service panel fits and removes cleanly
- [ ] Router hatch latches secure
- [ ] Saw-well faces are removable

---

## 23. Step 13: Finishing

### Finish ONLY After Proving All Fits

Before any finish goes on, verify:
- [ ] Saw sits flush (or slightly below) the fixed top
- [ ] Wing comes up flush and repeatable
- [ ] Router plate sits flush — no rocking
- [ ] Miter gauge slides through all slot transitions without catching
- [ ] All tracks and hardware fit properly

### Sample Board Test (Do This First!)

1. Prepare offcuts of plywood, MDF, and construction lumber
2. Ease edges exactly how you plan to ease the bench
3. Test the shellac + waterborne poly schedule
4. Confirm: hand feel, sheen, stain resistance
5. Check if MDF edges need a second seal coat

### Finish Sequence

1. Machine and dry-fit everything (already done)
2. **Pre-finish interior panels** that are hard to reach after assembly
3. Final sand all exposed faces
4. **Seal MDF** with dewaxed shellac (all MDF faces and edges)
5. Topcoat Class A surfaces (2-3 coats satin waterborne poly):
   - Fixed top
   - Front wing
   - Router module area
   - Drawer fronts
6. Topcoat Class B surfaces (1 sealer + 1-2 finish coats):
   - Outer cabinet faces
   - Service doors
   - Utility faces
7. Class C surfaces (hidden structure):
   - Knock down splinters
   - Spot-sand hand-contact edges
   - Optional quick seal coat in dusty zones
8. **Re-open critical fit surfaces** if finish buildup tightens them
   (miter tracks, router plate, saw fit)

### Edge Treatment

- All hand-contact edges: 1/16 to 1/8 in roundover or chamfer
- Sand to 150, then 180 before finish
- No sharp, splintery, or fuzzy edges in user-touch zones

### Completion Checklist

- [ ] Sample board approved
- [ ] Interior panels pre-finished
- [ ] MDF sealed with shellac
- [ ] Class A surfaces: 2-3 coats poly
- [ ] Class B surfaces: sealer + finish coats
- [ ] Class C surfaces: cleaned up
- [ ] No finish buildup binding tracks, plates, or saw fit
- [ ] All edges eased — no splinters

---

## 24. Validation Checklists

Run through these after the build is complete.

### Geometry

- [ ] Bench top overall: 90 x 48 x 36 in
- [ ] Blade centerline at 36 in from left edge
- [ ] Saw top flush or slightly below fixed top
- [ ] Rail keep-clear lanes unobstructed under right-side field
- [ ] Fixed top is L-shaped (not a single 90 x 48 slab)

### Crosscut System

- [ ] Left miter slot continuous through wing, saw, and rear support
- [ ] Right miter slot continuous through wing, saw, and rear support
- [ ] Miter gauge slides through each transition without catching
- [ ] Wing supports at least 24 in deep crosscuts
- [ ] Wing registration pins repeat slot alignment after 5+ deploy/stow cycles

### Router

- [ ] Lift plate flush — no rocking
- [ ] Fence mounts repeatably and removes without damage
- [ ] Router dust pickup does not block fence adjustment
- [ ] Collet accessible through right-side hatch

### Dust Collection

- [ ] Saw hose clears blade-height travel
- [ ] Saw hose clears bevel travel
- [ ] Hercules removable through front tray without removing top
- [ ] Cyclone bucket emptiable without removing manifold
- [ ] All clearances verified from layout (not just assumed)

### Power

- [ ] Tool circuit and aux circuit are separate
- [ ] Saw and router never depend on the internal aux strip
- [ ] RF remote controls extractor (no current-sensing auto-start)
- [ ] All cord exits work in both parked and rolled-out positions

### Assembly Mode

- [ ] Fixed T-tracks entirely left of saw opening
- [ ] Clamp heads in tracks do not foul miter gauge
- [ ] Future overlay anchors land in structure (not just MDF skin)

### Finish

- [ ] No sharp/splintery/fuzzy user-touch edges
- [ ] Finish buildup does not bind router plate, tracks, or saw fit
- [ ] Sample-board schedule was tested before finishing the bench

---

## 25. Post-Build Functional Tests

Perform these tests with the bench fully assembled:

1. **Roll and deploy:** Roll bench out from wall, deploy the wing, lower
   onto leveling feet. Verify stability.

2. **Rip tests:** Run a narrow rip, a wide rip, and a long rip. Check that
   the fence extends and the workpiece stays supported.

3. **Crosscut test:** Run a repeat crosscut with the miter gauge. Check for
   smooth slot transitions and consistent results.

4. **Router test:** Route a test edge profile and a groove. Check fence
   repeatability and dust collection.

5. **Dust switching:** Switch the manifold between saw, router, and flex
   hose. Verify each branch works and the extractor responds to the RF remote.

6. **Return to parked mode:** Stow the wing, roll bench back to wall.
   Confirm cord and hose management works in parked position.

---

## Appendix A: Stripped-Saw Survey Fill-In Worksheet

Print this page and take it to the shop with the saw.

| # | Measurement ID | Value | Units | Notes |
|---|----------------|-------|-------|-------|
| 1 | `stripped_blade_center_y` | ________ | in | Average of front & rear tooth readings |
| 2 | `miter_slot_width` | ________ | in | Verify both slots match |
| 3 | `miter_slot_depth` | ________ | in | Verify both slots match |
| 4 | `front_left_foot_center_x` | ________ | in | From left cast-top edge |
| 5 | `front_left_foot_center_y` | ________ | in | From front cast-top edge |
| 6 | `front_right_foot_center_x` | ________ | in | From left cast-top edge |
| 7 | `front_right_foot_center_y` | ________ | in | From front cast-top edge |
| 8 | `rear_left_foot_center_x` | ________ | in | From left cast-top edge |
| 9 | `rear_left_foot_center_y` | ________ | in | From front cast-top edge |
| 10 | `rear_right_foot_center_x` | ________ | in | From left cast-top edge |
| 11 | `rear_right_foot_center_y` | ________ | in | From front cast-top edge |
| 12 | `foot_pad_width_x` | ________ | in | Actual support footprint |
| 13 | `foot_pad_depth_y` | ________ | in | Actual support footprint |
| 14 | `mount_hole_diameter` | ________ | in | Caliper measurement |
| 15 | `lowest_underside_protrusion` | ________ | in | Below mount plane |
| 16 | `rail_front_projection_min` | ________ | in | From cast-top right edge |
| 17 | `rail_front_projection_mid` | ________ | in | From cast-top right edge |
| 18 | `rail_front_projection_max` | ________ | in | From cast-top right edge |
| 19 | `rail_rear_projection_min` | ________ | in | From cast-top right edge |
| 20 | `rail_rear_projection_mid` | ________ | in | From cast-top right edge |
| 21 | `rail_rear_projection_max` | ________ | in | From cast-top right edge |
| 22 | `dust_port_center_x` | ________ | in | From left cast-top edge |
| 23 | `dust_port_center_y` | ________ | in | From front cast-top edge |
| 24 | `dust_hose_sweep_depth_0deg` | ________ | in | Max behind rear edge |
| 25 | `dust_hose_sweep_depth_45deg` | ________ | in | Max behind rear edge |

**After recording:** Transfer all values to `data/measurements.csv` and run
the validation scripts.

---

## Appendix B: Surface Finish Classes

| Class | Surfaces | Treatment |
|-------|----------|-----------|
| **A** — Touch & Precision | Fixed top, front wing, router area, drawer fronts | Ease edges (1/16-1/8 in), sand to 180, shellac seal MDF, 2-3 coats satin waterborne poly |
| **B** — Visible Working | Outer cabinet faces, service doors, utility faces | Break edges, sand to 150, 1 sealer + 1-2 finish coats |
| **C** — Hidden Structure | Plinth, inside framing, underside blocking | Knock down splinters, spot-sand hand areas, optional seal in dusty zones |

**Do NOT finish these until fit is proven:**
- Miter-track dado shoulders
- Router-plate ledges
- Saw mount interfaces
- Overlay anchor points

---

## Appendix C: Dust & Power Wiring Reference

### Dust Plumbing Sequence

```
    SAW ────────────┐
    ROUTER ─────────┤── ROCKLER MANIFOLD ── LOW-PRO INLET ── LOW-PRO OUTLET ── HERCULES VACUUM PORT
    FLEX HOSE ──────┘
```

Only one branch open at a time.

### Power Circuit Map

```
    WALL OUTLET 1 ────────── TOOL PIGTAIL ──── SAW  -or-  ROUTER
                                                (never both)

    WALL OUTLET 2 ────────── FLANGED INLET ──── METAL STRIP ──┬── HERCULES (via RF remote)
                                                               ├── TASK LIGHT
                                                               └── CHARGERS
```

### Key Locations

| Component | Location |
|-----------|----------|
| Tool pigtail dock | Front-left underside, center module |
| Aux inlet | Right side of right module, toward front |
| Master aux shutoff | Front-right face |
| Internal power strip | Front-right interior wall |
| RF remote receiver | Right service bay (not behind extractor) |

### Garage Prerequisites

- [ ] Two real garage circuits available
- [ ] GFCI-protected receptacles (or code-compliant equivalent)
- [ ] Cord paths work in both parked and rolled-out positions
- [ ] Aux circuit handles extractor + accessories without overload

---

## Appendix D: Assembly-Mode & T-Track Reference

### Fixed T-Tracks in Permanent Top

Two flush aluminum T-tracks in the far-left field:

```
    ◄──────────── 90 in ──────────────────────►
    ┌──────────────────────────────────────────┐
    │  8"   20"                                │
    │  │     │                                 │
    │  ║     ║        (rest of bench top)      │
    │  ║     ║                                 │
    │  ║     ║    Track run: Y = 6 to Y = 42  │
    │  ║     ║                                 │
    │  │     │                                 │
    └──────────────────────────────────────────┘

    ║ = T-track (36 in low-profile aluminum)
```

**Location rules:**
- Tracks stay entirely LEFT of the saw opening
- Clamp heads must not foul the miter gauge during left-side support work

### Future Removable Overlay (Stage 2)

- Size: 60 x 36 x 3/4 in plywood
- Registers to left and rear edges
- Anchored with 4 star knobs into threaded inserts
- Underside stiffener (30 x 2 in) spans the saw opening
- Can later be perforated with 20 mm holes for MFT-style dog use

**Overlay anchor positions:**

| Anchor | X | Y |
|--------|---|---|
| Front-left | 6 in | 20 in |
| Rear-left | 6 in | 40 in |
| Front-right | 54 in | 20 in |
| Rear-right | 54 in | 40 in |

Build the overlay AFTER the core bench proves itself. Do not drill the
permanent top for dog holes until you have used the bench enough to know you
actually want them.

---

*End of Builder's Manual*
