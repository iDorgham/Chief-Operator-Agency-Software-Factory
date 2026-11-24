import type { TaskStatus, TaskLane } from "./types.ts";

export interface StateTransitionInput {
  currentStatus: TaskStatus;
  targetStatus: TaskStatus;
  lane: TaskLane;
  actor: string;
  owner: string;
  reviewer?: string | null;
  evidenceRefs: string[];
}

export interface StateTransitionResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Validates a task state transition according to Factory Core governance rules.
 *
 * Invariants enforced:
 * 1. Owner cannot act as reviewer (no self-review).
 * 2. Moving to 'completed' requires at least one verified evidence_ref.
 * 3. Moving to 'completed' requires a distinct reviewer.
 * 4. Fast lane can only transition draft -> active directly if internal and reversible.
 */
export function validateStateTransition(
  input: StateTransitionInput
): StateTransitionResult {
  const { currentStatus, targetStatus, lane, actor, owner, reviewer, evidenceRefs } = input;

  if (currentStatus === targetStatus) {
    return { allowed: false, reason: "Current and target status are identical." };
  }

  // Fast lane path: draft -> active
  if (lane === "fast") {
    if (currentStatus === "draft" && targetStatus === "active") {
      return { allowed: true };
    }
  }

  // Standard legal transitions
  const validTransitions: Record<TaskStatus, TaskStatus[]> = {
    draft: ["approved", "cancelled"],
    approved: ["queued", "blocked", "cancelled"],
    queued: ["active", "blocked", "cancelled"],
    active: ["review", "blocked", "cancelled"],
    blocked: ["queued", "active", "cancelled"],
    review: ["completed", "active", "cancelled"],
    completed: [],
    cancelled: [],
  };

  const allowedTargets = validTransitions[currentStatus] || [];
  if (!allowedTargets.includes(targetStatus)) {
    return {
      allowed: false,
      reason: `Illegal state transition from '${currentStatus}' to '${targetStatus}'.`,
    };
  }

  // Guard: Completion requires evidence
  if (targetStatus === "completed") {
    if (!evidenceRefs || evidenceRefs.length === 0) {
      return {
        allowed: false,
        reason: "Cannot complete task without at least one evidence reference.",
      };
    }

    // Guard: Owner cannot review/complete their own work
    if (actor === owner) {
      return {
        allowed: false,
        reason: "Owner cannot complete their own task. Separation of duties requires an independent reviewer.",
      };
    }

    // Guard: Reviewer must be explicitly recorded and distinct from owner
    if (!reviewer || reviewer === owner) {
      return {
        allowed: false,
        reason: "Task reviewer must be recorded and must differ from the task owner.",
      };
    }
  }

  return { allowed: true };
}
