CREATE TABLE "approvals" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"task_id" varchar(64) NOT NULL,
	"action" varchar(64) NOT NULL,
	"scope" text NOT NULL,
	"blast_radius" text NOT NULL,
	"status" varchar(32) DEFAULT 'pending' NOT NULL,
	"requester" varchar(64) NOT NULL,
	"decider" varchar(64),
	"rationale" text,
	"decided_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"project_id" varchar(64) NOT NULL,
	"task_id" varchar(64),
	"run_id" varchar(64),
	"event_type" varchar(64) NOT NULL,
	"actor" varchar(64) NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"summary" text NOT NULL,
	"previous_status" varchar(32),
	"new_status" varchar(32),
	"idempotency_key" varchar(128),
	"receipt_ref" text,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locks" (
	"resource_id" varchar(255) PRIMARY KEY NOT NULL,
	"holder_run_id" varchar(64) NOT NULL,
	"acquired_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"client_id" varchar(64),
	"workspace_root" text NOT NULL,
	"git_remote" text,
	"status" varchar(32) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "runs" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"task_id" varchar(64) NOT NULL,
	"ordinal" integer DEFAULT 1 NOT NULL,
	"provider" varchar(64) NOT NULL,
	"model" varchar(64) NOT NULL,
	"workspace_path" text NOT NULL,
	"status" varchar(32) DEFAULT 'preparing' NOT NULL,
	"exit_code" integer,
	"summary" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"project_id" varchar(64) NOT NULL,
	"client_id" varchar(64),
	"title" varchar(255) NOT NULL,
	"objective" text NOT NULL,
	"status" varchar(32) DEFAULT 'draft' NOT NULL,
	"lane" varchar(16) DEFAULT 'standard' NOT NULL,
	"owner" varchar(64) NOT NULL,
	"reviewer" varchar(64),
	"version" varchar(32) DEFAULT '1.0.0' NOT NULL,
	"acceptance_criteria" jsonb NOT NULL,
	"allowed_scope" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"exclusions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"dependencies" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"approved_input_refs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"evidence_refs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_run_id_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locks" ADD CONSTRAINT "locks_holder_run_id_runs_id_fk" FOREIGN KEY ("holder_run_id") REFERENCES "public"."runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "runs" ADD CONSTRAINT "runs_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "audit_events_idempotency_key_idx" ON "audit_events" USING btree ("idempotency_key");