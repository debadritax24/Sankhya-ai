def calculate_skill_gap(current_level: int, target_level: int) -> int:
    """
    Calculates the gap between the target competency and current competency.
    Skill Gap = Target Competency Level - Current Competency Level
    Returns 0 if current level exceeds or meets the target.
    """
    gap = target_level - current_level
    return max(gap, 0)

def determine_gap_priority(gap_score: int) -> str:
    """Determines the severity of the skill gap."""
    if gap_score >= 3:
        return "HIGH"
    elif gap_score == 2:
        return "MEDIUM"
    elif gap_score == 1:
        return "LOW"
    return "NONE"
